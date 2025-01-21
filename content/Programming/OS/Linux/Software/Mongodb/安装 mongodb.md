
创建一个普通用户
ins
```
adduser ins
apt install sudo
adduser ins sudo
```

接下去我们用用户ins 来安装 mongodb
[参考文档](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-debian/)

```
sudo apt-get install gnupg curl

curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
   --dearmor

echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/8.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

sudo apt-get update

sudo apt-get install -y mongodb-org

```

执行完这些，mongodb 已经安装好了。
接下去我们有systemd 去运行


```
systemctl start mongod
systemctl status mongod
```

至此，就安装完成了。
接下去就是开启远程连接。
