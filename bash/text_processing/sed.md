# sed

Stream editor used to perform basic text transformations on an input stream (file or from a pipeline)

## Basic Usage

> sed 's/old/new/' filename


Example:

> sed 's/World/Bash/' example_text.txt

## Options

`-i` => Edit files directly without needing to save separately
`-e` => Add the script to the commands to be executed
`-n` => Don't automatically print lines
`-r` => Use extended regular expressions
`-f` => Add script from a file
`-l` => Specify line length for `l` command
