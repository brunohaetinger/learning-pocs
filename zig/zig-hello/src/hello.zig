const std = @import("std");

fn add(a: i32, b: i32) i32 {
    return a + b;
}

fn mightFail(flag: bool) !i32 {
    if (!flag) return error.Failure;
    return 42;
}

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("Hello, Zig!\n", .{});

    // Variables
    const name = "Foo";
    const number: i32 = 42;
    try stdout.print("Hey, {s}. Solution is {}", .{ name, number });

    // Mutable var
    var count: i32 = 10;
    count += 1;

    // Data types

    // -- Integers
    const a: i32 = 100; // Signed 32-bit integer
    const b: u64 = 1000; // Unsigned 64-bit integer
    const c = 0xFF; // Hexadecimal notation
    const d = 0b1010_1010; // Binary notation
    std.debug.print("\nIntegers: a={}, b={}, c={}, d={}\n", .{ a, b, c, d });

    // -- Floating-Point Numbers
    const pi: f64 = 3.1415;
    std.debug.print("Pi value: {d:.4}\n", .{pi});

    // -- Boolean
    const is_zig_fun: bool = true;
    std.debug.print("Is Zig fun? {}\n", .{is_zig_fun});

    // -- Strings
    const greeting = "Hello, Zig!";
    std.debug.print("Greeting: {s}\n", .{greeting});

    // Control Flow

    // -- If / Else
    const age = 18;
    if (age >= 18) {
        std.debug.print("Adult\n", .{});
    } else {
        std.debug.print("Minor\n", .{});
    }

    // While Loop
    var i: i32 = 0;
    while (i < 5) : (i += 1) {
        std.debug.print("i = {}\n", .{i});
    }

    // For Loop
    const numbers = [_]i32{ 1, 2, 3, 4, 5 };
    for (numbers) |num| {
        std.debug.print("Number: {}\n", .{num});
    }

    // Functions
    const sum = add(5, 3);
    std.debug.print("5 + 3 = {}\n", .{sum});

    // Error Handling with !
    const result = mightFail(true) catch |err| {
        std.debug.print("Error: {}\n", .{err});
        return;
    };
    std.debug.print("Result: {}\n", .{result});

    // Structs (Similar to Objects)
    const Person = struct {
        name: []const u8,
        age: i32,
    };

    const person = Person{
        .name = "Alice",
        .age = 30,
    };

    std.debug.print("{s} is {} years old.\n", .{ person.name, person.age });

    // Pointers and Memory Management

    std.debug.print("-- Pointers and Memory Management.\n", .{});
    var x: i32 = 10;
    const ptr: *i32 = &x;
    std.debug.print("x is {}, ptr={}, ptr.*={}.\n", .{ x, ptr, ptr.* });
    // *i32 → Pointer to an integer.
    ptr.* += 1;
    std.debug.print("After ptr.* + 1 --- x={}, ptr={}, ptr.*={}.\n", .{ x, ptr, ptr.* });
    // ptr.* → Dereferencing.
}
