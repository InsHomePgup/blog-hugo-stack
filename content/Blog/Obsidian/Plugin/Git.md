test the git sync

test123

使用插件来完成自动的Git commit 和push

Every 5 mins for commit

Every 7 mins for push

Every 20 mins for pull

After file stoping edit.

脑阔疼，目前看上去没法自动commit & sync

好家伙，在重启了Obsidina以后突然这个自动同步就生效了。

之前关闭的时候我还用的是1分钟，然后我随便做了一点修改就提交了两次。

现在是设置了5分钟一次同步，感觉还不错。

这个时间还是需要自己琢磨一下，设定到一个比较正常的值。

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250403102955086.png)

	最后的方案，设置120分钟自动pull，60分钟自动sync，然后手动sync
	手动sync的方式就是ctrl + p 打开快捷控制台以后输入 git sync有一个git commit & sync的选项


