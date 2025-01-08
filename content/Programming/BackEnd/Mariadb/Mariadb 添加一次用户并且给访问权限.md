
### 创建用户

> 方括号里的内容代表变量

```mysql
create user [username];
```
### 删除用户

```mysql
drop user if exists [username];
```

### 创建用户的同时去创建密码

```mysql
CREATE USER foo2@test IDENTIFIED BY 'mariadb';
```

### 给用户一个数据库全部的权限

```mysql
GRANT ALL PRIVILEGES ON [databaseName].* TO '[username]'@'%' ;



flush privileges;  # 刷新

```

``` mysql
# 查询端口
show global variables like 'port';
```

