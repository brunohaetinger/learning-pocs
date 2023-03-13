# Factorial

Bigest factorial input for "default" math lib is 22, as the result for 23 will be larger than 64bits.

## Results

### Python 

| Input | Recursive Time | Loop Time |
| --- | --- | --- |
| 5000 | 0.0090s | 0.0073s |
| 10000 | 0.0311s | 0.0291s |
| 50000 | Segmentation fault | 0.8540s|


### C++

Compiling v1  (with custom BigInt implementation)
> g++ -o factorial factorial.cpp

Compiling v2 (using GMP)
> make

Get factorial of 5 with:
> ./program 5


| Input | C++ v1 | C++ v2 |
| --- | --- | --- |
| 5000 | 0.450s | 0.0025s |
| 10000 | 2.177s | 0.0097s |
| 50000 | 56.432s | 0.2090s |


### Python using C++

| Input | Python using C++ | 
| --- | --- | 
| 5000 | 0.0022s |
| 10000 | 0.0088s | 
| 50000 | 0.2513s |