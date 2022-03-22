# 自定义数据集

## 下载SeaweedFS的工具文件
```seaweedfs.py``` 可从[此处](http://10.249.181.72:8079/login?redirect=%2Ffile)下载
> 其中提供了Client类，包括以下6个方法
> * list_object
> * put_object
> * put_objects
> * get_object
> * delete_object
> * is_dir

## 以Cifar10数据集为例
> 和torchvision.datasets.CIFAR10相比，只需要作两处修改
> * 引入seaweedfs ```from seaweedfs import Client```
> * 将```with open(file, mode) as f:```替换为```with client.get_object(file) as f:```

完整示例如下：
```python
"""
自定义cifar10数据集的读取
"""

import os
import pickle


import numpy as np
import torchvision.transforms as transforms
from PIL import Image
from torch.utils.data.dataset import Dataset
from seaweedfs import Client

client = Client(
    # filer的ip:port
    filer="localhost:8888"
)


class Cifar10(Dataset):
    base_folder = 'cifar-10-batches-py'
    tgz_md5 = 'c58f30108f718f92721af3b95e74349a'
    train_list = [
        ['data_batch_1', 'c99cafc152244af753f735de768cd75f'],
        ['data_batch_2', 'd4bba439e000b95fd0a9bffe97cbabec'],
        ['data_batch_3', '54ebc095f3ab1f0389bbae665268c751'],
        ['data_batch_4', '634d18415352ddfa80567beed471001a'],
        ['data_batch_5', '482c414d41f54cd18b22e5b47cb7c3cb'],
    ]

    test_list = [
        ['test_batch', '40351d587109b95175f43aff81a1287e'],
    ]
    meta = {
        'filename': 'batches.meta',
        'key': 'label_names',
        'md5': '5ff9c542aee3614f3951f8cda6e48888',
    }

    # dirname 为训练/测试数据地址，使得训练/测试分开
    def __init__(self, root, train=True, transform=None):
        super(Cifar10, self).__init__()

        self.root = root
        self.train = train
        self.transform = transform
        if self.train:
            data_list = self.train_list
        else:
            data_list = self.test_list

        self.data = []
        self.targets = []

        # now load the picked numpy arrays
        for file_name, checksum in data_list:
            file_path = os.path.join(self.root, self.base_folder, file_name).replace('\\', '/')
            with client.get_object(file_path) as f:
                entry = pickle.load(f, encoding='latin1')
                self.data.append(entry['data'])
                if 'labels' in entry:
                    self.targets.extend(entry['labels'])
                else:
                    self.targets.extend(entry['fine_labels'])

        self.data = np.vstack(self.data).reshape(-1, 3, 32, 32)
        self.data = self.data.transpose((0, 2, 3, 1))  # convert to HWC

        self._load_meta()

    def _load_meta(self):
        path = os.path.join(self.root, self.base_folder, self.meta['filename']).replace('\\', '/')
        with client.get_object(path) as infile:
            data = pickle.load(infile, encoding='latin1')
            self.classes = data[self.meta['key']]
        self.class_to_idx = {_class: i for i, _class in enumerate(self.classes)}

    def __len__(self):
        return len(self.data)

    def __getitem__(self, index):
        """
        Args:
            index (int): Index

        Returns:
            tuple: (image, target) where target is index of the target class.
        """
        img, target = self.data[index], self.targets[index]

        # doing this so that it is consistent with all other datasets
        # to return a PIL Image
        img = Image.fromarray(img)

        if self.transform is not None:
            img = self.transform(img)

        return img, target
```