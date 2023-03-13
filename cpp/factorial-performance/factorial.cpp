#include <iostream>
#include <gmpxx.h> //  GNU Multiple Precision Arithmetic Library (GMP).
#include "factorial.h"

mpz_class factorial(int n) {
  mpz_class result = 1;
  for (int i = 2; i <= n; i++) {
      result *= i;
  }
  return result;
}

// Due to type incopability between Python and "mpz_class", this returns nothing
// Note that the return value of factorial is a mpz_class object, which is not directly compatible with Python's native types. You may need to convert the result to a Python-compatible type using a library like PyGObject or PyGTK.
void factorialVoid(int n) {
  mpz_class result = 1;
  for (int i = 2; i <= n; i++) {
      result *= i;
  }
}