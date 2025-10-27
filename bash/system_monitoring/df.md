# df

Used to report file system disk space usage.

## Output

- Filesystem: the name of the file system.
- 1K-blocks: Total size of the file system in 1K blocks
- Used: Amount of space used
- Available: Amount of space available for use
- Use%: Percentage of space used
- Mounted on: Directory where the file system is mounted

## Options

- `-h` => Show sizes in human-readable format (e.g., KB, MB)
- `-a` => Show all file systems, even empty ones
- `-T` => Show the type of file system
- `-i` => Show inode usage (obs.: inodes are data structures used by many file systems to store information about files and directories, such as their size, owner, permissions, and timestamps.)
- `-P` => Use POSIX output format
