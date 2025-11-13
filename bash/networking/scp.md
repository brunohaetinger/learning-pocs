# scp

Used to securely copy files between hosts on a network

> scp file.txt user@example.com:/home/user/

## Options

- `-r` => Recursively copy entire directories
- `-P` => Specify the port to connect on the remote host
- `-i` => Specify an identity (private key) file
- `-C` => Enable compression
- `-v` => Enable verbose mode
- `-l` => Limit the bandwidth used by the copy
