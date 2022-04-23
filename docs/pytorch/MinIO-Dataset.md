# 网盘系统数据集使用

## 上传数据集
### 私有目录
> 通过 [ICES网盘](http://10.249.181.72:9080/storage/) 上传你的数据集，假设路径为```/datasets/your_dataset```，
> 则在代码中使用```/workplace/datasets/your_dataset```作为数据集路径，其它代码不变

## 以Cifar10数据集为例
### 私有目录
> * 上传Cifar10数据集**cifar-10-batches-py**到网盘系统的私有目录
>   * 假设路径为 ```/datasets/cifar/cifar-10-batches-py```
> * 在代码中创建数据集
> ```python
> from torchvision.datasets import CIFAR10
> 
> trainset = torchvision.datasets.CIFAR10(
>       root="/workplace/datasets/cifar",
>       train=True,
>       download=False,
>       transform=transforms.Compose(
>           [
>               transforms.RandomCrop(32, padding=4),
>               transforms.RandomHorizontalFlip(),
>               transforms.ToTensor(),
>               transforms.Normalize(
>                   (0.4914, 0.4822, 0.4465), (0.2023, 0.1994, 0.2010)
>               ),
>           ]
>       ),
>   )
> ```

### 公共目录（待修改）
> * 使用公共目录中已有的数据集
>   * 假设路径为 ```/datasets/cifar/cifar-10-batches-py```
> ```python
> from torchvision.datasets import CIFAR10
> 
> trainset = torchvision.datasets.CIFAR10(
>       root="/workplace/public/datasets/cifar",
>       train=True,
>       download=False,
>       transform=transforms.Compose(
>           [
>               transforms.RandomCrop(32, padding=4),
>               transforms.RandomHorizontalFlip(),
>               transforms.ToTensor(),
>               transforms.Normalize(
>                   (0.4914, 0.4822, 0.4465), (0.2023, 0.1994, 0.2010)
>               ),
>           ]
>       ),
>   )
> ```