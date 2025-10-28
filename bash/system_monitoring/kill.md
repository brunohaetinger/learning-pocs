# kill


Used to terminate process in a Unix-like operating system

## Options

- `-9` => Forcefully terminate a process
- `-l` => List all signal names
- `-s [signal]` => Specify a signal to send
- `-p` => Print the process ID

## Usages


- Forcefully terminate a process: `kill -9 1234`
- Send a custom signal: `kill -s SIGTERM 1234`
- Print process ID: `kill -p 1234`
