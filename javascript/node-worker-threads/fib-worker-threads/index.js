const { Worker } = require('worker_threads');


const doFib = async (n) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const worker = new Worker('./fib-worker-threads/fib.js', {
      workerData: {
        n
      }
    })


    worker.once('message', (data => {
      console.log(`worker [${worker.threadId}] done in: ${Date.now() - startTime}ms`);
      resolve(data);
    }))

    worker.once('error', (err) => reject(err))
  });
}

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