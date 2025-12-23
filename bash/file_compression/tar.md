# tar

Used to create, maintain, modify, and extract files from an archive file.

## Options

- `-c` => Create a new archive
- `-x` => Extract files from an archive
- `-t` => List the contents of an archive
- `-z` => Filter the archive through gzip
- `-v` => Verbosely list files processed
- `-f` => Specify the filename of the archive

## Usages

Creates a new archive with the specified files:
> tar -cvf archive.tar file1 file2

Extract files from an archive:
> tar -xvf archive.tar

List the contents without extracting them:
> tar -tvf archive.tar

Filters the archive through gzip, compresssing or decompressing it:
> tar -czvf archive.tar.gz file1 file2

