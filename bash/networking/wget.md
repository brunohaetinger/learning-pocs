# wget

Used to download files from the web

Basic usage:
`wget http://example.com/file.txt`


## Options

- `-b` => Run in the background
- `-q` => Quiet mode (no output)
- `-r` => Download directories recursively
- `-c` => Continue getting a partially-downloaded file
- `--limit-rate` => Limit download speed


## Usages


Run in the background
`wget -b http://example.com/file.txt`


Quit mode
`wget -q http://example.com/file.txt`


Recursive downloads
`wget -r http://example.com/directory/`


Continue getting a Partially downloaded file
`wget -c http://example.com/largefile.zip`

Limit download speed
`wget --limit-rate=200k http://example.com/largefile.zip`
