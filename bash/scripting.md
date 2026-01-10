# bash scripting

Sequence of commands executed by the Bash shell. Used to automate tasks

Syntax:
- Comments: start with `#` and Bash ignores it
- Command Order: Commands are sequencial, and run one after the other
- Semicolons: use `;` to run multiple commands on the same line

## Variables in scripts

Assign values using the `=` sign without spaces
```bash
name="World"
echo "Hello, $name!"
```

## Environment Variables

Are accessible by just using them:
> echo "Your PATH is $PATH"


## Local variables

Are available within the block of code in which they are defined, such as within a function.
```bash
my_function() {
  local local_var="I am local"
  echo $local_var
}
my_function
```


## Data types

There are Strings, Numbers, Arrays, Associative Arrays.

Arrays:
```bash
fruits=("Apple" "Banana" "Cherry")
for fruit in "${fruits[@]}"; do
  echo $fruit
done


Associative Arrays, are similar to dictionaries in other languages, letting you add or remove keys and values, having named keys to access values.
```bash
declare -A colors
colors[apple]="red"
colors[banana]="yellow"
colors[grape]="purple"
unset colors[banana]
echo ${colors[apple]} # red
echo ${colors[grape]} # purple
```

Data Type limitations:
Bash does not support floating-point arithmetic natively. For such operations, consider using external tools like `bc` or `awk`

## Operators

Comparison:
- `-eq`: Equal to
- `-ne`: Not Equal to
- `-lt`: Less than
- `-le`: Less than or equal to
- `-gt`: Greater than 
- `-ge`: Greater or Equal to

Logical:
- `&&`: AND
- `||`: OR
- `!`: NOT

File tests:
- `-e`: Checks if a file exists
- `-d`: check if a directory exists
- `-f`: Check if a file is a regular file
- `-s`: checks if a file is not empty

```bash
FILE_PATH="/path/to/file.txt"

if [ -f "$FILE_PATH"]; then
  echo "The file $FILE_PATH exists and is a regular file."
elif [ -d "$FILE_PATH"]; then
  echo "The path $FILE_PATH is a directory"
else
  echo "The file $FILE_PATH does not exist or is not a regular file/directory."
fi

```

## If...Else Statements

The condition is enclosed in square brackets.

Example
```bash
num=15
if [ $num -gt 10 ]; then
  echo "Number is greater than 10"
fi
```
