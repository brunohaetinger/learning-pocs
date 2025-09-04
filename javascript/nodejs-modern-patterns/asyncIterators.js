import { EventEmitter, once } from 'node:events';

class DataProcessor extends EventEmitter {
  async *processStream() {
    for (let i = 0; i < 10; i++) {
      this.emit('data', `chunk-${i}`);
      yield `processed-${i}`;
      // Simulate async processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    this.emit('end');
  }
}

// Consume events as an async iterator
const processor = new DataProcessor();
processor.on('data', (msg)=> console.log(`Data from emitted event is: ${msg}`))
for await (const result of processor.processStream()) {
  console.log('Processed:', result);
}
