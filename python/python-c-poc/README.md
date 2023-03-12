# Python and C++ PoC

Identify how to import and use C++ libraries in Python.

There are 2 main ways to do it:
- CTypes
- Cython

## Steps

1. Compile C++ code into a shared library (.so on Linux or .dll on Windows)
1. Load the library in Python using ctypes.cdll.LoadLibrary
1. Define the argument types and return type of C++ function using the ctypes function prototypes
1. Call C++ function using the loaded library

### Compiling C++ into a shared library

Compile
> g++ -fPIC -c custom_math.cpp

Generate shared-library
> g++ -shared -o lib_custon_math.so custom_math.o`