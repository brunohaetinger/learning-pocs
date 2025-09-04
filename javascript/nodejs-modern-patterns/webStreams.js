// Create a Web Stream (compatible with browsers)
const webReadable = new ReadableStream({
  start(controller) {
    controller.enqueue('Hello ');
    controller.enqueue('World!');
    controller.close();
  }
});

// Convert between Web Streams and Node.js streams
const nodeStream = Readable.fromWeb(webReadable);
const backToWeb = Readable.toWeb(nodeStream);
