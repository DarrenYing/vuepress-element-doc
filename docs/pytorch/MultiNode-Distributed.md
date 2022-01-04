# 多机多卡训练配置

## Docker容器配置
多机多卡训练需要在linux系统环境下进行，建议使用docker容器 
> 首先需要将宿主机的显卡映射到docker容器中，可以使用[Nvidia-Docker](https://github.com/NVIDIA/nvidia-docker)实现

> 推荐使用pytorch官方镜像来创建docker容器，用户需要根据自己的cuda版本来选择相应的镜像，
> 假设pytorch版本为1.10，cuda版本为11.3，如果需要nvcc编译，则使用
> ```pytorch/pytorch:1.10.0-cuda11.3-cudnn8-devel```镜像，如果不需要，则使用
> ```pytorch/pytorch:1.10.0-cuda11.3-cudnn8-runtime```镜像即可

> 在创建容器时，需要传入```--gpus [gpu_id]```来指定想在容器中使用的GPU，另外，用户还需要根据num_workers的大小，传入
> ```--shm-size [size]```参数来为容器分配合适的shared memory

例如
```shell
docker run --gpus all --name [xxx] --shm-size 8g -v [dir1]:[dir2] -it pytorch/pytorch:1.10.0-cuda11.3-cudnn8-runtime
```
在容器内部，可以通过```nvidia-smi```命令来测试Nvidia-Docker是否配置成功，使用```nvcc -V```测试当前环境是否支持nvcc编译

## Docker容器间通信
不同机器间的Docker容器是不能直接通信的，需要配置Docker Swarm，创建容器集群服务，下面将详细介绍。
> Docker Swarm配置教程，暂略

配置好Docker Swarm后，需要在创建容器时，传入```--network [swarm_network_name]```参数，使得多个Docker容器能够实现跨主机通信

使用```ip a```命令查看Docker容器网卡类型（如eth0等），然后可以通过以下两种方式配置相应的环境变量。
> 直接在bash命令行中执行```export NCCL_SOCKET_IFNAME=eth0```

> 执行```vim ~/.bashrc```（需要先按照vim），在文件尾部追加```export NCCL_SOCKET_IFNAME=eth0```，保存并退出后，
> 执行```source ~/.bashrc```刷新bash

> 如果需要在程序执行过程中打印更详细的NCCL信息，可以再配置```export NCCL_DEBUG=INFO```，配置方法同上。

## 数据集和项目代码
> 数据集和项目代码需要先上传到uds中，在创建Docker容器时，挂载数据卷映射，将其映射进Docker容器内即可

## 多机多卡程序执行
> 假设有两台主机，每台主机有两张GPU，则启动命令如下：

在master机器上执行
```shell
python -m torch.distributed.launch --nproc_per_node=2 --nnodes=2 --node_rank=0 --use_env --master_addr="your_master_ip" --master_port=29500  main.py
```
在另一台机器上执行
```shell
python -m torch.distributed.launch --nproc_per_node=2 --nnodes=2 --node_rank=1 --use_env --master_addr="your_master_ip" --master_port=29500  main.py
```