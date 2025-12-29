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



