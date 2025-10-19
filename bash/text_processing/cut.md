# cut

Used to remove sections from each line of files. Useful tool for extracting specific fields of data from a file or output stream.

## Options

`-d` => Choose what separates the fields
`-f` => Select specific fields to display
`--complement` => Show all fields except the selected ones

## Usages

> cut -d',' -f1 data/example_data.csv
> cut -d',' -f1-2 data/example_data.csv
> cut --complement -d',' -f1-2 data/example_data.csv

> cut -d' ' -f2 data/example_text.txt

