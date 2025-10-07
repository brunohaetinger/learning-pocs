# awk

Used for pattern scanning and processing language.

## Basic Usage

Consider using `./example_data.csv`:

- Print first column of a file: `awk -F", " '{print $1} filename'`
> awk -F"," '{print $1}' example_data.csv

## Options

`-F` => Define separators on data fields
`-v` => Set a variable to be used n the script
`-f` => Use a file as the source of the awk program
