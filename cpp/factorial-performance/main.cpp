#include <iostream>
#include <chrono>
#include <iomanip> // For setprecision
#include "factorial.h"
#include <gmpxx.h> //  GNU Multiple Precision Arithmetic Library (GMP).

using namespace std;
using namespace chrono;

int main(int argc, char* argv[]) {
  if(argc > 1){
    int n = stoi(argv[1]);

    // Calculate the factorial and measure the time taken
    auto start_time = high_resolution_clock::now();
    mpz_class fac = factorial(n);
    auto end_time = high_resolution_clock::now();

    // Print the result and time taken
    // cout << n << "! = " << fac << endl;

    auto duration = duration_cast<microseconds>(end_time - start_time);
    cout << "Time taken: " << fixed << setprecision(4) << duration.count() / 1000000.0 << " seconds" << endl;

  } else {
    cout << "No arguments passed." << endl;
  }
  return 0;
}