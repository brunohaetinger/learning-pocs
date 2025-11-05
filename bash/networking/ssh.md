# ssh

Used to connect to a remote machine securely

Basic usage:
`ssh user@example.com`


## Options

- `-p` => Specify the port
- `-i` => Use a private key file
- `-v` => Enable verbose mode
- `-C` => Enable compression
- `-X` => Enable X11 forwarding
- `-o` => Specify options directly on the command line


## Usages


- Connect on specific port:
> ssh -p 2222 user@example.com

- Use identity file
> ssh -i /path/to/private_key user@example.com

- Verbose mode
> ssh -v user@example.com

- Connect using compression over network
> ssh -C user@example.com

- X11 forwarding, to run graphical applications on the remote server and display locally:
> ssh -X user@example.com

- Specify Options directly on the command line, overriding configuration settings:
> ssh -o StrictHostKeyChecking=no user@example.com
