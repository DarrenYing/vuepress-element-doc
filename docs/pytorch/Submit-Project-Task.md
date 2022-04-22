# 提交任务

## 任务配置信息
> * 项目路径
>   * 项目名称相对于根目录的路径，如项目名称为```ProjectTest```，存放路径为```/MyDir/tets/```，
>     则项目路径为填为```MyDir/test/ProjectTest```
> * 工作目录
>   * 工作目录为项目启动的主文件在项目中的相对路径前缀，如在```ProjectTest```项目中，主文件路径为
>     ```ProjectTest/dir1/dir2/main.py```，则工作目录填为```dir1/dir2```
> * 启动命令
>   * 如需要安装包再执行
>   ```
>   pip install -r requirements.txt && python -m torch.distributed.launch --nproc_per_node=1 --nnodes=1 main.py
>   ```
>   * 对于一般任务，需要使用 -u 参数以确保日志正常显示
>   ```
>   python -u main.py
>   ``` 
> * 选择镜像
>   * pytorch/pytorch:1.10-cuda11.3-cudnn8-runtime
>      > extends the base image by adding all the shared libraries from the CUDA toolkit.
      Use this image if you have a pre-built application using multiple CUDA libraries.
>   * pytorch/pytorch:1.10-cuda11.3-cudnn8-devel
>     > extends the runtime image by adding the compiler toolchain, the debugging tools, the headers and the static libraries.
>   * 简单来说，runtime镜像更完整，包含编译和调试工具
> * 任务模式
>   * 分为长时任务和短时任务，目前任选即可