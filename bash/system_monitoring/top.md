# top

Used to display Linux tasks. Monitor system performance in real-time

## Output columns

- PID: Process ID, a unique identifier for each process
- USER: The user account that owns the process
- PR: the priority of the process
- NI: Nice value, which affects scheduling priority
- VIRT: Virtual memory size used by the process
- RES: Resident memory size, the non-swapped physical memory the proces uses
- SHR: Shared memory size
- S: Process status (e.g., S for Sleeping, R for Running)
- %CPU: CPU usage percentage
- %MEM: Memory usage percentage
- TIME+: Total CPU time the process has used since it started
- COMMAND: The command that started the process
