# sort

Sort lines of text files

Command:

> sort filename

## Options

- `-r` => Sort in reverse order
- `-n` => Sort numbers correctly
- `-k` => Sort by a specific column
- `-u` => Remove duplicate lines
- `-t` => Specify a delimiter for fields, without this option, it assumes whitespace as default delimiter



## Usage


Sort by specific column, using comma delimiter
> sort -t "," -k2,2 data/fruits.txt

Sort by specific column, sorting numbers correctly
> sort -t "," -n -k2,2 data/fruits.txt

Complex sorting:
Sorts by the first column, and then by the second column in reverse order
> sort -t "," -k1,1 -k2,2r data/fruits.txt

