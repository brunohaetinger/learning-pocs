// main.js - Non-blocking delegation
import { Worker } from 'node:worker_threads';
import { fileURLToPath } from 'node:url';

async function calculateFibonacci(number) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      fileURLToPath(new URL('./worker.js', import.meta.url)),
      { workerData: { number } }
    );

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

// Your main application remains responsive
console.log('Starting calculation...');
const result = await calculateFibonacci(40);
console.log('Fibonacci result:', result);
console.log('Application remained responsive throughout!');
