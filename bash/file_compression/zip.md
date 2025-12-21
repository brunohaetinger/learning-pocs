# zip

Used to package and compress files into a ZIP archive.

Basic Usage
> zip archive.zip file1 file2

## Options

- `-r` => Recursively zip directories
- `-u` => Update files in the arhive if they are newer
- `-d` => Delete files from the archive
- `-e` => Encrypt the contents of the ZIP arhive
- `-x` => Exclude specific files from being zipped


## Usage

Zip directories and their contents recursively
> zip -r archive.zip folder/

Updates files in the archive only if they are newer than the existing files
> zip -u archive.zip file1 file2

Deletes specified files from the archive
> zip -d archive.zip file1

Encrypts the contents, requiring a password to unzip
> zip -e archive.zip file1 file2

Excludes specific files from being added to the archive
> zip archive.zip file1 file2 -x file2
