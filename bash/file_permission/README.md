# File Permissions and ownership

Each file has an Owner, a Group and a set of permissions that determine who can read, write, or execute the file.

## File Permissions

- `r`: read
- `w`: write
- `x`: execute

e.g: `rwxr-xr--` means:
- Owner can read, write, and execute the file
- The group can read and execute
- Others can only read

## Numeric representation of Permissions

File permissions can also be represented numerically, which is often used in scripts and command-line operations:

- `0`: No permission
- `1`: Execute permission
- `2`: Write permission
- `3`: Write and execute permissions
- `4`: Read permission
- `5`: Read and execute permissions
- `6`: Read and write permissions
- `7`: Read, write, and execute permissions

e.g: Numeric permission `755` means:
- Owner can read, write and execute (7)
- Group and Others can read and execute (5)

## Common commands

- `chmod`: Change file permissions
- `chown`: Change file ownership
- `chgrp`: Change group ownership
