# Factorial

Bigest factorial input for "default" math lib is 22, as the result for 23 will be larger than 64bits.

## Results

### Python only

| Input | Recursive Time | Loop Time |
| --- | --- | --- |
| 5000 | 0.0090s | 0.0073s |
| 10000 | 0.0311s | 0.0291s |
| 50000 | Segmentation fault | 0.8540s|


### C++


#### C++ v1 (with custom BigInt implementation)

Compiling
> g++ -o factorial factorial.cpp

C++ loop 
5000 0.450s
10000 2.177s
50000 56.432s

#### C++ v2 (using GMP)

Compiling
> g++ -o factorial -lgmp factorial.cpp

C++ loop 
5000 0.003s
10000 0.010s
50000 0.208s
