# Git Worktree Cheatsheet

## List worktrees
```bash
git worktree list
```

## Add a new worktree
```bash
git worktree add <path> <branch>
```

## Remove a worktree
```bash
git worktree remove <path>
```

## Prune stale worktree references
```bash
git worktree prune
```

## Move a worktree
```bash
git worktree move <old-path> <new-path>
```

## Lock/unlock a worktree
```bash
git worktree lock <path>
git worktree unlock <path>
```
