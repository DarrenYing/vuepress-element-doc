# 网盘系统数据集使用

## 上传数据集
### 私有数据集
> 通过 [ICES网盘](https://www.hitminer.cn/storage/) 在数据集页面上传您的数据集，假设路径为```/dataset/your_dataset```，
> 则在代码中使用```/workplace/dataset/your_dataset```作为数据集路径，其它代码不变

### 数据集缓存
> 在提交执行任务时，可以将数据集从分布式存储中先缓存到对应的执行节点，使容器远程训练速度与本地基本一致
> 
> 1、设置数据集。假设上传文件夹结构为```/dataset/mnist/...```，且想将```mnist```作为数据集，
> 则需要右键该文件夹，选择设置为数据集
> 
> 2、提交任务时设置数据集缓存。在表单的数据集缓存项中，写入数据集路径，如```/dataset/mnist/```，再点击提交即可，
> 数据集从分布式存储缓存到执行节点的过程中，会在输出框显示进度。
> 
> 需要注意的是，如果数据集是文件夹，在填入数据集缓存路径时，结尾需要加/，如果数据集是文件，则结尾不需要加/。
> 
> 3、更新数据集。假设数据集内容有更新，且用户在执行任务时希望更新数据集缓存，则右键该文件夹，选择更新数据集，并以第二步所述方式提交任务。

## 打包为ERO格式的数据集
### 小文件数据集
> 如果您的数据集由许多小于10M的文件组成，如图片数据集，强烈建议先将该数据集打包为```ero```文件，便于从分布式数据库中读取和写入该数据集。

### 工具安装
> Linux：apt install erofs-utils
> 
> Windows：[erofs打包工具下载](https://github.com/affggh/erofs-utils-cygwin/releases/download/1.4-dirty/erofs-utils_affggh_cygwin64_withlzma_static.zip)
> 下载后解压即可
### 打包过程
```
// cmd
mkfs.erofs -zlz4 dist_file src_path
// example-linux
mkfs.erofs -zlz4 ~/mnist.ero ~/mnist
// example-windows
mkfs.erofs -z-lz4 mnist.ero .\mnist\
```
> 生成.ero文件后，将该文件上传至数据集，右键，依次点击设置数据集、更新数据集。
> 
> 提交任务时，在表单的数据集缓存项中，写入对应数据集路径，如```/dataset/mnist.ero```，再点击提交即可。
> 
> 在代码中使用该数据集时，用法不变，使用```/workplace/dataset/your_dataset```作为数据集路径，如```/workplace/dataset/mnist```，不需要加.ero后缀名。

## 以Cifar10数据集为例
### 私有数据集
> * 上传Cifar10数据集**cifar-10-batches-py**到网盘系统的私有目录
>   * 假设路径为 ```/dataset/cifar/cifar-10-batches-py```
> * 在代码中创建数据集
> ```python
> from torchvision.datasets import CIFAR10
> 
> trainset = torchvision.datasets.CIFAR10(
>       root="/workplace/dataset/cifar",
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

### 公共目录（暂略）

[//]: # (> * 使用公共目录中已有的数据集)

[//]: # (>   * 假设路径为 ```/dataset/cifar/cifar-10-batches-py```)

[//]: # (> ```python)

[//]: # (> from torchvision.datasets import CIFAR10)

[//]: # (> )

[//]: # (> trainset = torchvision.datasets.CIFAR10&#40;)

[//]: # (>       root="/workplace/public/dataset/cifar",)

[//]: # (>       train=True,)

[//]: # (>       download=False,)

[//]: # (>       transform=transforms.Compose&#40;)

[//]: # (>           [)

[//]: # (>               transforms.RandomCrop&#40;32, padding=4&#41;,)

[//]: # (>               transforms.RandomHorizontalFlip&#40;&#41;,)

[//]: # (>               transforms.ToTensor&#40;&#41;,)

[//]: # (>               transforms.Normalize&#40;)

[//]: # (>                   &#40;0.4914, 0.4822, 0.4465&#41;, &#40;0.2023, 0.1994, 0.2010&#41;)

[//]: # (>               &#41;,)

[//]: # (>           ])

[//]: # (>       &#41;,)

[//]: # (>   &#41;)

[//]: # (> ```)