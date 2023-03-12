import time
import sys

# https://stackoverflow.com/questions/73693104/python-3-10-7-valueerror-exceeds-the-limit-4300-for-integer-string-conversi
sys.set_int_max_str_digits(0)

def factorialRecursive(n):
  return 1 if n == 1 else n * factorialRecursive(n-1)

def factorialLoop(n):
  result = n
  while n > 1:
    result = result * (n - 1)
    n -= 1

  return result



# --- 
sys.setrecursionlimit(10**6)

if len(sys.argv) > 1:
  first_arg = sys.argv[1]
  n = int(first_arg)

  start_time = time.perf_counter()

  # code to be timed
  # factorialRecursive(n)
  factorialLoop(n)

  end_time = time.perf_counter()

  total_time = end_time - start_time
  print(f"Total time: {total_time:.4f} seconds")
else:
  print("No arguments passed.")