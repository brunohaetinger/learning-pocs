#include <iostream>
#include <chrono>
#include <iomanip>
#include <gmpxx.h> //  GNU Multiple Precision Arithmetic Library (GMP).

using namespace std;
using namespace chrono;

extern "C" {
  mpz_class factorial(int x) {
    mpz_class result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
  }
}


int main(int argc, char* argv[]) {
  if(argc > 1){
    int n = stoi(argv[1]);

    // Calculate the factorial and measure the time taken
    auto start_time = high_resolution_clock::now();
    mpz_class fac = factorial(n);
    auto end_time = high_resolution_clock::now();

    // Print the result and time taken
    // cout << n << "! = ";
    // for (int i = result.digits.size() - 1; i >= 0; i--) {
    //     cout << result.digits[i];
    // }
    // cout << endl;
    auto duration = duration_cast<microseconds>(end_time - start_time);
    cout << "Time taken: " << fixed << setprecision(3) << duration.count() / 1000000.0 << " seconds" << endl;

  } else {
    cout << "No arguments passed." << endl;
  }
  return 0;
}
