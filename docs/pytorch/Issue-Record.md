# 常见问题记录和解答

## 1.单机多卡训练时，多卡使用率不均衡
> 可能是由于num_workers过小，CPU读取数据慢，读的数据只够一张卡训练，可以尝试调大num_workers
> 
> 推荐将num_workers数量设置为GPU数量的4倍，开启pin_memory

## 2.数据集的随机数种子固定
> 在每个epoch重置data_sampler的随机数种子，```train_loader.sampler.set_epoch(epoch)```

## 3.多卡控制台输出信息重复
> 推荐使用logging代替print进行信息打印，并给不同进程设置不同的输出级别，只在0号进程（主进程）保留全部输出。
> ```python
> import logging
> # 给主要进程（rank=0）设置低输出等级，给其他进程设置高输出等级。
> logging.basicConfig(level=logging.INFO if rank in [-1, 0] else logging.WARN)
> # 普通log，只会打印一次。
> logging.info("This is an ordinary log.")
> # 危险的warning、error，无论在哪个进程，都会被打印出来，从而方便debug。
> logging.error("This is a fatal log!")

## 4.多卡的训练精度不如单卡
> 如果单机卡数为n，需要修改batch_size为单卡时的1/n，如果增大batch_size,需要将learning rate也相应增大
> 
> 如果model中有BatchNorm层，推荐开启SyncBN
> 
> ```model = torch.nn.SyncBatchNorm.convert_sync_batchnorm(model).to(device)```



