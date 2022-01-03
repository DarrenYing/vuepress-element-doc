# Pytorch分布式训练简介

## DataParallel
```python
class torch.nn.DataParallel(module, device_ids=None, output_device=None, dim=0)
```
> * 自动分割数据，将相同的模型复制到所有GPU，每个GPU消耗输入数据的不同分区
> 
> * 通过单进程、多线程方式并行训练，受限于python的GIL
> 
> * 只支持数据并行，性能不佳
> 
> * 网络在**前向传播**的时候会将model从主卡(默认是逻辑0卡)复制一份到所有的device上,input_data会在batch这个维度被分组后upload到不同的device上计算。在**反向传播**时，每个卡上的梯度会汇总到主卡上,求得梯度的均值后,再用反向传播更新单个GPU上的模型参数，最后将更新后的模型参数复制到剩余指定的GPU中进行下一轮的前向传播,以此来实现并行。


## DistributedDataParallel
```python
CLASS torch.nn.parallel.DistributedDataParallel(module, device_ids=None, 
    output_device=None, dim=0, broadcast_buffers=True, process_group=None, 
    bucket_cap_mb=25, find_unused_parameters=False, check_reduction=False, 
    gradient_as_bucket_view=False)
```
> * 支持数据并行和模型并行
>
> * 多进程并行训练，不受限于python的GIL
>
> * DDP在各进程梯度计算完成之后,各进程需要将梯度进行汇总平均,然后再由 `rank=0` 的进程,将其 `broadcast` 到所有进程后,各进程用该梯度来独立的更新参数，相较于DP, DDP传输的数据量更少,因此速度更快,效率更高。
>
> * 效率较高，更推荐使用。CPU训练使用GLOO，GPU训练使用NCCL。