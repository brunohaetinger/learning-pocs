//! By convention, main.zig is where your main function lives in the case that
//! you are building an executable. If you are making a library, the convention
//! is to delete this file and start with root.zig instead.

const std = @import("std");

/// This imports the separate module containing `root.zig`. Take a look in `build.zig` for details.
const lib = @import("zig_search");

pub fn main() !void {
    const searchTerm: []const u8 = "@import";
    // Prints to stderr (it's a shortcut based on `std.io.getStdErr()`)
    std.debug.print("Starting directory iteration...\n", .{});

    const gpa = std.heap.page_allocator;
    var dir = try std.fs.cwd().openDir(".", .{ .iterate = true }); // open current directory with iteration permissions
    defer dir.close();

    var it = dir.iterate(); // No try, since it doesn't return an error union
    while (try it.next()) |entry| {
        std.debug.print("Name: {s}\n", .{entry.name});
        // Next TODO: When it's a file, inspect its content and store if it contains the searcheable text.
        // Future TODO: To have all files in a recursevely maner, it could be with recursion, but it may not be the best, so we can use Tree, Queue or other data structure to keep track if need to dive deep into the directories
        if (entry.kind == .file and std.mem.endsWith(u8, entry.name, ".txt")) {
            try searchInFile(gpa, entry.name, searchTerm);
        }
    }
}

fn searchInFile(allocator: std.mem.Allocator, filename: []const u8, searchTerm: []const u8) !void {
    var file = try std.fs.cwd().openFile(filename, .{});
    defer file.close();

    var buffered_reader = std.io.bufferedReader(file.reader());
    var reader = buffered_reader.reader();

    var line_buf = std.ArrayList(u8).init(allocator);
    defer line_buf.deinit();

    var line_number: usize = 1;
    var found: bool = false;

    while (try reader.readUntilDelimiterOrEofAlloc(allocator, '\n', 1024)) |line| {
        if (std.mem.containsAtLeast(u8, line, 1, searchTerm)) {
            if (!found) {
                std.debug.print("Matches in file: {s}\n", .{filename});
                found = true;
            }
            std.debug.print("Line {d}: {s}\n", .{ line_number, line });
        }
        line_number += 1;
        line_buf.clearRetainingCapacity();
    }
}

test "simple test" {
    var list = std.ArrayList(i32).init(std.testing.allocator);
    defer list.deinit(); // Try commenting this out and see if zig detects the memory leak!
    try list.append(42);
    try std.testing.expectEqual(@as(i32, 42), list.pop());
}
