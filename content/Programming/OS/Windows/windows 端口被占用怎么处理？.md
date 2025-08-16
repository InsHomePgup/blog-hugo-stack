---
title: "windows 端口被占用怎么处理？"
date: 2024-12-01
categories:
  - operating-system
  - windows
---


[引用站点](https://www.cnblogs.com/xyzdw/articles/2108149.html)


```text

以下文章主要以80端口号为例，如果想知道其他的端口号也可以使用该方法..........................  
  
**1、在windows下如何查看80端口占用情况?是被哪个进程占用?如何终止等.  
**        这里主要是用到windows下的DOS工具,点击"开始"--"运行",输入"cmd"后点击确定按钮,进入DOS窗口,接下来分别运行以下命令:  
        >netstat -aon | findstr "80"  
                Proto  Local Address          Foreign Address        State            PID  
                ====  ============      ==============  ==========  ======  
                TCP    0.0.0.0:80                    0.0.0.0:0                LISTENING      1688  
可以看出80端口被进程号为1688的程序占用.  
        >tasklist | findstr "1688"  
图像名                                                PID            会话名                    会话#       内存使用  
               ========================= ====== ================ ======== ============  
               inetinfo.exe                                        1688           Console                      0              2,800 K  
很明显,是inetinfo占用了80端口;inetinfo.exe主要用于支持微软Windows IIS网络服务的除错,这个程序对你系统的正常运行是非常重要的.  
        当然,并不是只有inetinfo.exe进程会占用80端口,这只是我机器上的情况.如果你并不了解此进程是干什么用的,千万不要盲目地将其kill掉,最好先百度或Google搜索一下;当然如果你很了解它,并确定可以终止,那么继续下面的命令.  
        >taskkill /pid 1688 /F  
成功: 已终止 PID 为 1688 的进程。  
如果你很熟悉此进程,并确定可以终止,那么就直接使用上面的命令把PID为1688的进程终止.(这一步同样可以在任务管理器中执行,inetinfo.exe就是任务管理器中的映像名称,选中它,点击"结束进程"即可)  
        >tasklist | findstr "1688"  
再次确认是否成功终止,如果成功终止此次执行命令后应返回空.

**2、linux下如何查看80端口占用情况?是被哪个进程占用?如何终止等**

查询端口是否被占用，被哪个进程占用有两种方式：1、netstat -anl | grep "80" ；2、lsof -i:80

终止进程的方式：kill pid

```

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250107100309905.png)



