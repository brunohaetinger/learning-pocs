const fibonacci = (n) => {
  return n < 1 ? 0
    : n <= 2 ? 1
    : fibonacci(n-1) + fibonacci(n-2);
}

const doFib = (n) => new Promise((resolve) => {
  const startTime = Date.now();
  const result = fibonacci(n);
  console.log(`doFib done in: ${Date.now() - startTime}ms`);
  resolve(result);
})

const main = async () => {
  const startTime = Date.now();
  const results = await Promise.all([
    doFib(42),
    doFib(42),
    doFib(42),
    doFib(42),
    doFib(42),
    doFib(42),
    doFib(42),
    doFib(42),
    doFib(42),
    doFib(42),
  ]);

  console.log('Results: ', results);
  console.log(`Fib done in ${Date.now() - startTime}ms`);
}

main().catch(console.error)