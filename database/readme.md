### Restore Database
To restore db:
1) connect to bash as 'postgres' user
```
sudo -i -u postgres
```
2) run 'psql' command
```
psql
```
3) inside psql terminal execute following commands
```postgresql
CREATE USER admin PASSWORD '1234';
CREATE DATABASE gsstore WITH OWNER = admin;
```
4) log out from psql terminal '\q'. Execute following
```
psql -d gsstore -f /path_to_dump/dump.sql
```

### Dump Database
1) execute following from any user 
```
pg_dump -h 127.0.0.1 -U admin gsstore -f dump.sql
```