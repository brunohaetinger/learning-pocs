import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';

// Create transform streams with clean, focused logic
const upperCaseTransform = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

// Process files with robust error handling
async function processFile(inputFile, outputFile) {
  try {
    await pipeline(
      createReadStream(inputFile),
      upperCaseTransform,
      createWriteStream(outputFile)
    );
    console.log('File processed successfully');
  } catch (error) {
    console.error('Pipeline failed:', error);
    throw error;
  }
}
