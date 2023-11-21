# Node Worker Threads

Use Node Worker Threads to test it's performance and check how it works.

1. Synchronous execution
1. Traditional Work thread, each process has its own context/block of memory.
1. Share buffer data within threads, to avoid messaging between process

## Results

- Using Sync execution

> node fibsync/index.js
``` 
doFib done in: 2642ms
doFib done in: 2589ms
doFib done in: 2579ms
doFib done in: 2604ms
doFib done in: 2585ms
doFib done in: 2608ms
doFib done in: 2576ms
doFib done in: 2585ms
doFib done in: 2580ms
doFib done in: 2600ms
Results:  [
  267914296, 267914296,
  267914296, 267914296,
  267914296, 267914296,
  267914296, 267914296,
  267914296, 267914296
]
Fib done in 25958ms
``` 

- Using Worker Threads

> node fib-worker-threads/index.js 
``` 
worker [2] done in: 2938ms
worker [7] done in: 2940ms
worker [6] done in: 2961ms
worker [9] done in: 2992ms
worker [5] done in: 3042ms
worker [10] done in: 3099ms
worker [1] done in: 4486ms
worker [8] done in: 4477ms
worker [3] done in: 4568ms
worker [4] done in: 4572ms
Results:  [
  267914296, 267914296,
  267914296, 267914296,
  267914296, 267914296,
  267914296, 267914296,
  267914296, 267914296
]
Fib done in 4586ms
``` 

- Data sharing
> node transfer-data/index.js  
``` 
Buffer before modify:  Uint8Array(4) [ 3, 3, 3, 3 ]
buffer after Modify Uint8Array(4) [ 42, 42, 42, 42 ]
``` 