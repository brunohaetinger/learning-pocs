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
// So performance can still be measured
void factorialVoid(int n) {
  mpz_class result = 1;
  for (int i = 2; i <= n; i++) {
      result *= i;
  }
}