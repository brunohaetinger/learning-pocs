#ifndef FACTORIAL_H
#define FACTORIAL_H

#include <gmpxx.h>

extern "C" mpz_class factorial(int n);
extern "C" void factorialInt(int n);

#endif
