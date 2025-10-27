# du

Used to estimate file space usage;


## Output

- Size: The amount of disk space used by the file or directory
- Path: The file or directory path

## Options

- `-h` => Show sizes in human-readable format (e.g., KB,MB)
- `-s` => Show only the total size for each item
- `-a` => Show sizes for all files, not just directories
- `-c` => Produce a grand to total
- `--max-depth=N` => Limit the depth of directory traversal


## Usages

1. Disk usage, in human-readable format, summing total and max depth of 2:
`du -hc --max-depth=2 ~/Downloads`
