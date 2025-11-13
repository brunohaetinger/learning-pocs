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


## Usage

- Recursive copy
> scp -r /path/to/directory user@example.com:/home/user/

- Specify Port
> scp -P 2222 file.txt user@example.com:/home/user/

- Use Private key
> scp -i /path/to/private_key file.txt user@example.com:/home/user/

- Enable Compression
> scp -C file.txt user@example.com:/home/user/

- Limit bandwidth
> scp -l 100 file.txt user@example.com:/home/user/
