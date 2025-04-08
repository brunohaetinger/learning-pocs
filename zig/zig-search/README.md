# Zig Search

An executable, where I can run as `zs "import" /src` and it will search for `import` string in all files inside `/src` directory (recursivelly)

The output contains this format as example:

```
- /src/root.zig
    - 4: `const std = @import("std");`
```

Where there are the file name, idented with findings inside the file, on each line is each finding with the line number and the line text.


## Build binary

- Build with: `zig build-exe src/main.zig`
- Run output: `./main`
- Run for specific platform: `zig build-exe -target x86_64-linux src/main.zig`
