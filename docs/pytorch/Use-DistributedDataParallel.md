# 使用Pytorch进行分布式训练

## 从单卡到多卡
### 导入包
```python
import os
import torch
import torch.distributed as dist
import torch.nn as nn
import torchvision
from torch.nn.parallel import DistributedDataParallel as DDP
```


### 初始化进程组
```python
# initialize the process group
rank = int(os.environ["RANK"])
local_rank = int(os.environ["LOCAL_RANK"])
world_size = int(os.environ["WORLD_SIZE"])
torch.cuda.set_device(rank % torch.cuda.device_count())
dist.init_process_group(backend="nccl")
device = torch.device("cuda", local_rank)
```

### 数据集
```python
# define your dataset
train_set = your_training_dataset(root='train_path', train=True,
    transform=torchvision.transforms.Compose([some transforms]))
train_sampler = torch.utils.data.distributed.DistributedSampler(
    train_set,
    shuffle=True,
)
train_loader = torch.utils.data.DataLoader(
    train_set,
    batch_size=BATCH_SIZE,
    num_workers=NUM_WORKERS,
    pin_memory=False,
    sampler=train_sampler,
)

test_set = your_testing_dataset(root='test_path')
test_loader = torch.utils.data.DataLoader(
    test_set,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=NUM_WORKERS)
```

### 模型
```python
# define your model
model = your_model(args)
model = model.to(device)
# if open SyncBN
if args.syncBN:
    model = torch.nn.SyncBatchNorm.convert_sync_batchnorm(model).to(device)
# use DDP
model = DDP(model, device_ids=[local_rank], output_device=local_rank)

# define your optimizer and loss function
criterion = your_loss_function()
optimizer = your_optimizer()
```

### 训练
```python
model.train()
for epoch in range(args.epochs):
    # reset random seed every epoch
    train_loader.sampler.set_epoch(epoch)
    
    # normal training procedure
    for idx, (inputs, labels) in enumerate(train_loader):
        inputs, labels = inputs.to(device), labels.to(device)
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
    
        # some other operations
        ...
    
        if rank == 0 and other conditions:
            log_something()

    # only save model on rank-0
    if rank == 0 and epoch % args.save_epochs == 0:
        torch.save(net.state_dict(), CHECKPOINT_PATH)
```

### 测试
```python
with torch.no_grad():
    for data in test_loader:
        # some test operations
        # do not need to change your original test code
```

### 启动命令
```shell
# 单机多卡的两种启动命令
python -m torch.distributed.launch --nproc_per_node=2 --nnodes=1 main.py (--arg1 ... train script args...)
torchrun --standlone --nproc_per_node=2 main.py (--arg1 ... train script args...)
```

## 整体代码结构
### 依赖导入
```python
import torch
# ...
```

### 定义参数
```python
def add_argument():
    parser = argparse.ArgumentParser(description='Template')
    
    # multiprocessing settings
    parser.add_argument('--local_rank', type=int, default=-1,
                        help='node rank for distributed training')
    # other arguments
    parser.add_argument('-b',
                     '--batch_size',
                     default=256,
                     type=int,
                     help='mini-batch size (default: 32)')
    parser.add_argument('-e',
                     '--epochs',
                     default=10,
                     type=int,
                     help='number of total epochs (default: 10)')
    # ...
    
    args = parser.parse_args()
    return args
```

### 定义数据集
```python
def make_data_loader(args, **kwargs):
    train_set = your_dataset(args, split='train')
    val_set = your_dataset(args, split='val')
    test_set = your_dataset(args, split='test')
    # use distributed sampler
    train_sampler = DistributedSampler(train_set, shuffle=True)
    train_loader = DataLoader(train_set, batch_size=args.batch_size, sampler=train_sampler, **kwargs)
    # do not need distributed wrapped
    val_loader = DataLoader(val_set, batch_size=args.test_batch_size, shuffle=False, **kwargs)
    test_loader = DataLoader(test_set, batch_size=args.test_batch_size, shuffle=False, **kwargs)
    return train_loader, val_loader, test_loader
```

### 定义Trainer
```python
class Trainer(obejct):
    def __init__(self, args):
        # initialize the environment
        rank = int(os.environ["RANK"])
        local_rank = int(os.environ["LOCAL_RANK"])
        torch.cuda.set_device(rank % torch.cuda.device_count())
        dist.init_process_group(backend="nccl")
        self.device = torch.device("cuda", local_rank)
        
        # define dataloader
        kwargs = {'num_workers': args.workers, 'pin_memory': True}
        self.train_loader, self.val_loader, self.test_loader = make_data_loader(args, **kwargs)
        
        # define model
        model = your_model(args)
        model = model.to(device)
        # if open SyncBN
        if args.syncBN:
            model = torch.nn.SyncBatchNorm.convert_sync_batchnorm(model).to(device)
        # wrap model with DDP
        self.model = DDP(model, device_ids=[local_rank], output_device=local_rank)
        # resume checkpoint
        self.model.load_state_dict(torch.load(args.checkpoint_path))
        
        # define other configs
        self.criterion = your_loss_function()
        self.optimizer = your_optimizer()
        self.lr_scheduler = your_lr_scheduler()
    
    def train(self, epoch):
        self.model.train()
        # your training code
        # ...
    
    def validate():
        self.model.eval()
        # your validation code
        # ...
        
    def test():
        with torch.no_grad():
            # your testing code
            # ...    
        
```
        

### 主函数
```python
def main():
    args = add_argument()
    trainer = Trainer(args)
    for epoch in range(args.start_epoch, args.epochs):
        trainer.train(epoch)
        if not trainer.args.no_val and epoch % args.eval_interval == (args.eval_interval - 1):
            trainer.validate(epoch)
    trainer.test()
```

### 入口函数
```python
if __name__ == "__main__":
    main()
```
