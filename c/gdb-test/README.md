# GDB Test

Compiling with debug flag:
> gcc -g -o gdb-test gdb-test.c

Some useful commands:

- gdb ./gdb-test
- break main
    - set breakpoint on main function
- list
- step
- next
- continue
    - resume program execution until the next breakpoint
- print
    - evaluate and print the value of an expression or variable
- info locals
- info breakpoints
- delete 2
    - Delete breakpoint #2
