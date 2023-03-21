# Redis

## Setup on Arch

- Installation: `yay -S redis`
- Start service: `systemctl start redis.service`

## Commands

Create simple key: `set abc 123`
Get key: `get abc`
Set a TTL of 5 seconds: `expires abc 5`


## Data structures

### Strings

Adding a string:
```shell
redis> SET mykey "Hello World"
OK
```

Getting a string:
```shell
redis> GET mykey
"Hello World"
```

### Lists

Adding to a list:
```shell
redis> LPUSH mylist "item1"
(integer) 1
redis> LPUSH mylist "item2"
(integer) 2
redis> LPUSH mylist "item3"
(integer) 3
```


Getting a list:
```shell
redis> LRANGE mylist 0 -1
1) "item3"
2) "item2"
3) "item1"
```

### Sets
Adding to a set:
```shell
redis> SADD games "fifa"
(integer) 1
redis> SADD games "efootball"
(integer) 1
redis> SADD games "rocket-league"
(integer) 1
```

Getting a set:
```shell
redis> SMEMBERS games
1) "rocket-league"
2) "fifa"
3) "efootball"
```

Checking existente of member in a set:
```shell
redis> SISMEMBER games "fifa"
(integer) 1
redis> SISMEMBER games "super mario"
(integer) 0
```

Create a second Set: 
```shell
redis> SADD johnGames zelda "super mario" sonic fifa
(integer) 1
```

Checking Intersection between Sets:
```shell
SINTER games johnGames
1) "fifa"
```


### Hashes

Adding to a hash:
```shell
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1

redis> HSET cities John "Los Angeles" Foo "Paris"
(integer) 2
```

Get one field:
```shell
redis> HGET cities John
"Los Angeles"
```

Getting a hash:
```shell
redis> HGETALL cities
1) "John"
2) "Los Angeles"
3) "Foo"
4) "Paris"
```

### Sorted sets:

Adding to a sorted set:
```shell
redis> ZADD hoursPlayed 100 fifa
(integer) 1
redis> ZADD hoursPlayed 50 PES
(integer) 1
redis> ZADD hoursPlayed 500 "rocket-league"
(integer) 1
```

Getting a sorted set:
```shell
redis> ZRANGE hoursPlayed 0 -1 WITHSCORES
1) "PES"
2) "50"
3) "fifa"
4) "100"
5) "rocket-league"
6) "500"
```

Add more elements and get all with scores:

```shell
redis> ZADD hoursPlayed 70 "team-fortress"
(integer) 1
redis> ZRANGE hoursPlayed 0 -1 WITHSCORES
1) "PES"
2) "50"
3) "team-fortress"
4) "70"
5) "fifa"
6) "100"
7) "rocket-league"
8) "500"
```