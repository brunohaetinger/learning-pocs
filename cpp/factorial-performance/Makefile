CC = g++
GMP_FLAGS = -lgmp -lgmpxx
CFLAGS = -Wall -Wextra -pedantic -std=c++11 $(GMP_FLAGS)

all: program

program: main.o factorial.o
	$(CC) $(CFLAGS) -o program main.o factorial.o

main.o: main.cpp
	$(CC) $(CFLAGS) -c main.cpp

factorial.o: factorial.cpp
	$(CC) $(CFLAGS) -c factorial.cpp

lib_factorial.so:
	$(CC) -shared $(CFLAGS) -o lib_factorial.so factorial.cpp

clean:
	rm -f program *.o *.so
