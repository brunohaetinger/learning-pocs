const { Worker } = require('worker_threads');

const sharedBuffer = new SharedArrayBuffer(4);
const buffer = new Uint8Array(sharedBuffer);
buffer.fill(3);

console.log('Buffer before modify: ', buffer);


const worker = new Worker('./transfer-data/w.js', {
  workerData: {sharedBuffer},
});

worker.once('message', () => {
  console.log('buffer after Modify', buffer);
})