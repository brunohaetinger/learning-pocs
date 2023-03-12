import ctypes

# Load the shared library
lib = ctypes.cdll.LoadLibrary('./lib_custom_math.so')

# Define the argument and return types of the C++ function
lib.square.argtypes = [ctypes.c_int]
lib.square.restype = ctypes.c_int

# Call the C++ function
result = lib.square(5)
print(result)
