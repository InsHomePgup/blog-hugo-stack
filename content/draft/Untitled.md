& "C:\Users\user\scoop\apps\mariadb\current\bin\mysqld.exe" --install

& "C:\Users\user\scoop\apps\mariadb\current\bin\mysqld.exe" --remove

& "C:\Users\user\scoop\apps\mariadb\current\bin\mysql.exe" -u root -p


& "C:\Users\user\scoop\apps\mariadb\current\bin\mysql_install_db.exe" --service=MariaDB --password=123 --defaults-file="C:\Users\user\scoop\apps\mariadb\current\my.ini"

[System.Environment]::SetEnvironmentVariable(
    "SCOOP",
    "C:\Users\user\scoop",
    [System.EnvironmentVariableTarget]::User
)

[System.Environment]::SetEnvironmentVariable(
    "Path",
    [System.Environment]::GetEnvironmentVariable("Path", "User") + ";C:\Users\user\scoop\shims",
    [System.EnvironmentVariableTarget]::User
)