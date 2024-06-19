# --- Example 1: Creating and Indexing Arrays
import numpy as np

# Create an array
arr = np.array([1, 2, 3, 4, 5])

# Indexing
print(arr[0])  # Output: 1
print(arr[1:3])  # Output: [2 3]



# --- Example 2: Basic Operations
import numpy as np

# Create two arrays
arr1 = np.array([1, 2, 3, 4, 5])
arr2 = np.array([6, 7, 8, 9, 10])

# Basic operations
print(arr1 + arr2)  # Output: [ 7  9 11 13 15]
print(arr1 * arr2)  # Output: [ 6 14 24 36 50]




# --- Example 3: Matrix Operations
import numpy as np

# Create two matrices
mat1 = np.array([[1, 2], [3, 4]])
mat2 = np.array([[5, 6], [7, 8]])

# Matrix multiplication
print(np.dot(mat1, mat2))  # Output: [[19 22], [43 50]]


# --- Example 4: Statistical Functions
import numpy as np

# Create an array
arr = np.array([1, 2, 3, 4, 5])

# Statistical functions
print(np.mean(arr))  # Output: 3.0
print(np.median(arr))  # Output: 3.0
print(np.std(arr))  # Output: 1.58113883046





# --- Example 5: Random Number Generation
import numpy as np

# Generate random numbers
print(np.random.rand(3))  # Output: [0.5488135  0.71518937 0.60276338]
print(np.random.randint(0, 10, 3))  # Output: [8 3 9]





# --- Example 6: Linear Algebra
import numpy as np

# Create a matrix
mat = np.array([[1, 2], [3, 4]])

# Linear algebra functions
print(np.linalg.det(mat))  # Output: -2.0
print(np.linalg.inv(mat))  # Output: [[-2.   1.], [ 1.5 -0.5]]