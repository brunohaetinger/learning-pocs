#include <iostream>
#include <chrono>
#include <vector>
#include <iomanip>

using namespace std;
using namespace chrono;

// Define a struct to represent big integers
struct BigInt {
    vector<int> digits;

    BigInt() {}

    BigInt(int x) {
        while (x) {
            digits.push_back(x % 10);
            x /= 10;
        }
    }

    void operator*=(int x) {
        int carry = 0;
        for (int i = 0; i < digits.size(); i++) {
            int prod = digits[i] * x + carry;
            digits[i] = prod % 10;
            carry = prod / 10;
        }
        while (carry) {
            digits.push_back(carry % 10);
            carry /= 10;
        }
    }
};

// Define a function to calculate factorial using big integers
BigInt factorial(int n) {
    BigInt result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main(int argc, char* argv[]) {
  if(argc > 1){
    int n = stoi(argv[1]);

    // Calculate the factorial and measure the time taken
    auto start_time = high_resolution_clock::now();
    BigInt result = factorial(n);
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
