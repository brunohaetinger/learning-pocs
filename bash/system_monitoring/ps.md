# ps

Report a snapshot of current processes

## Output columns

- PID: Process ID, a unique identifier for each process
- TTY: Terminal type associated with the process
- TIME: Total CPU time used by the process
- CMD: the command that started the process


## Options


- `-e`: Show all processes
- `-f`: Show detailed information
- `-u`: Show processes for a specific user 
- `-a`: Show all processes with a Terminal
- `-x`: Show processes without a terminal


## Usage


`ps -f`
`ps -u`
`ps -ef`
