# rsync

Tool used to efficiently transfer and synchronize files accross computers, by checking the timestamp and size of files.

Basic usage:
> rsync -avz /local/dir/ user@example.com:/remote/dir

## Output

- `File List`: List the files being transferred.
- `Transfer Progress`: shows the progress of each file transfer
- `Compression Ratio`: Indicates the effectivieness of compression if used 
- `Speed`: The speed at which files are being transferred

## Options

- `-a` => Archive mode
- `-v` => Increase verbosity
- `-z` => Compress file data
- `--delete` => Delete extraneous files
- `-r` => recurse into directories
- `-u` => Skip files that are newer on the received
- `--progress` => Show progress during transfer
