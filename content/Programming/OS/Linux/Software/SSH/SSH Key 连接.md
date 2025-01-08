
[root@host .ssh]$ chmod 600 authorized_keys
[root@host .ssh]$ chmod 700 ~/.ssh

配置两个权限

 authorized_keys 文件里面加入pub key


/etc/ssh/sshd_config
配置

RSAAuthentication yes
PubkeyAuthentication yes

重启sshd

systemctl restart sshd

#  使用ssh命令 + 密钥去连接ssh

