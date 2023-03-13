import ctypes
import time
import sys

# Load the shared library
lib = ctypes.cdll.LoadLibrary('./lib_factorial.so')

# # Define the argument and return types of the C++ function
lib.factorialVoid.argtypes = [ctypes.c_int]
# Note that the return value of factorial is a mpz_class object, which is not directly compatible with Python's native types. You may need to convert the result to a Python-compatible type using a library like PyGObject or PyGTK.
lib.factorialVoid.restype = ctypes.c_void_p


if len(sys.argv) > 1:
  first_arg = sys.argv[1]
  n = int(first_arg)

  start_time = time.perf_counter()

  # code to be timed
  lib.factorialVoid(n)

  end_time = time.perf_counter()

  total_time = end_time - start_time
  print(f"Total time: {total_time:.4f} seconds")
else:
  print("No arguments passed.")
