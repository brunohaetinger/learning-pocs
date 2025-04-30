# bun-sse

A simple Server-Sent Events (SSE) demo using Bun. This project demonstrates how to create a basic SSE server that streams real-time server time updates to a web client.

## Features

- SSE endpoint at `/events` that sends the current server time every 2 seconds.
- Basic HTML client page that connects to the SSE endpoint and displays messages in real-time.

## Installation

Install dependencies using Bun:

```bash
bun install
```

## Running the Project

Start the server with:

```bash
bun run index.ts
```

The server will listen on port 3000.

## Testing the SSE

1. Open your browser and navigate to `http://localhost:3000`.
2. The page will connect to the SSE endpoint and display server time updates every 2 seconds.
3. You can inspect the network tab in your browser's developer tools to see the event stream.

## Project Structure

- `index.ts`: The Bun server implementation with SSE endpoint and static HTML serving.
- `index.html`: The client HTML page that connects to the SSE server.

## About Bun

This project was created using `bun init` in Bun v1.2.5. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
