# 自定义数据集

## 上传数据集
> 通过 [ICES网盘](http://10.249.181.72:8079/file) 上传你的数据集，假设路径为```/datasets/your_dataset```，
> 则在代码中使用```/home/datasets/your_dataset```作为数据集路径，其它代码不变

## 以Cifar10数据集为例
> * 上传Cifar10数据集**cifar-10-batches-py**到网盘系统
>   * 假设路径为 ```/datasets/cifar-10-batches-py```
> * 在代码中创建数据集
> ```python
> from torchvision.datasets import CIFAR10
> 
> trainset = torchvision.datasets.CIFAR10(
>       root="/home/datasets",
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