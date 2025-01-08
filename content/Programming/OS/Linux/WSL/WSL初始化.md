(链接)[https://learn.microsoft.com/en-us/windows/wsl/install]
wsl --install -d debian
安装
#### 配置wsl config

配置自动proxy

用户的根目录下面添加文件  .wslconfig

```
[experimental]
autoMemoryReclaim=gradual  
networkingMode=mirrored
dnsTunneling=true
firewall=true
autoProxy=true
```

#### 配置默认root用户
C:\Users\User\AppData\Local\Microsoft\WindowsApps

到这个目录下面执行
debian.exe config --default-user root

### 刚安装好的debian没有systemctl 怎么办

vim /etc/wsl.conf

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/Pasted%20image%2020240809142919.png)

[参考网站](https://learn.microsoft.com/zh-cn/windows/wsl/systemd)


```
[boot]
systemd=true
```


