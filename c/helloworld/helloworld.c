#include <stdio.h>
#include <stdlib.h>

int main() {
  int year = 2022;

  printf("Value equals: %i\n", year);
  printf("Address is: %p\n", &year);

  // string is an array of chars
  char hello[] = "Hello everyone";

  // Pointer
  char *str = malloc(4); 

  str[0] = 'h';
  str[1] = 'e';
  str[2] = 'y';
  str[3] = '\0'; // Null character at the end to create a string.

  free(str); // Release "str" from memory allocation

  // Return 0 for success or 1 for failure.
  return 0;
}