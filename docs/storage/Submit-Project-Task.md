# 提交任务

## 任务配置信息
> * 项目路径
>   * 项目名称相对于根目录的路径，如项目名称为```ProjectTest```，存放路径为```/MyDir/test/```，
>     则项目路径为填为```MyDir/test/ProjectTest```
> 
>   * 项目路径通常会自动填充，若没有自动填充，可以尝试关闭任务提交界面，再重新打开
> * 选择GPU
>    * 选择所要使用的GPU范围
>    * 不选择则随机分配，优先分配数据集缓存所在的节点
> * 数据集路径
>   * 如果需要对数据集缓存，则填入要缓存的数据集路径，如```/dataset/yourDataset/```，详见**数据集使用**小节
> * 启动命令
>   * 对于一般任务，则使用正常启动命令即可
>   ```
>   python main.py
>   ```
>   * 多机多卡任务，启动命令如下
>   ```shell
>   export NCCL_DEBUG=INFO; export  NCCL_SOCKET_IFNAME=eth0; export NCCL_IB_DISABLE=1; python -m torch.distributed.launch --nproc_per_node=$(nvidia-smi -L | wc -l) --nnodes=$DOCTOR_ALL_NODE --node_rank=$((DOCTOR_NODE_INDEX-1)) --use_env --master_addr=node1 --master_port=29500  main.py
>   ```
> * 选择镜像
>   * 10.249.177.55:8084/system_image/default_image:v2.0.3
>      > 系统提供的默认镜像，包含 pytorch-1.13.0 + cuda-11.7，cv2 等库

