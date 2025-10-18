# tail

Used to display the st part of fles

```bash
tail -n 1 data/fruits.txt
# bananas,4
```


# Options

- `-n [number]`: Display the st [number] lines of the file
- `-f`: follow the file as it grows, useful for monitoring log files
- `-c [number]`: Display the last [number] bytes of the file
- `--pid=[pid]` Terminate after the process with the given PID dies.
- `--retry`: keep trying to open a file even if it is inaccessible
