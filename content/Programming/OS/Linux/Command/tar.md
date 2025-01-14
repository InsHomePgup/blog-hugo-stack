
打包
```shell
tar -c -f target.tar file1 file2 file3
```

```
tar -c -f target.tar abc.txt def.txt
```

提取到test目录下
```shell
tar -x -f target.tar -C test/
```

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250113173204670.png)

非常好用。


### 使用压缩算法
```
tar -cz -f target.tar.gz abc.txt def.txt
```
c:创建
x:解压缩 搭配 -C 指定输出目录
```
 tar -xz -f target.tar.gz -C test/
```


[tar的使用（掘金）](https://juejin.cn/post/6904971490010398733)

