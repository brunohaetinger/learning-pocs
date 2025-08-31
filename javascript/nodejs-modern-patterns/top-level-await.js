// app.js - Clean initialization without wrapper functions
import { readFile } from 'node:fs/promises';

const config = JSON.parse(await readFile('config.json', 'utf8'));
const server = createServer(/* ... */);

console.log('App started with config:', config.appName);
