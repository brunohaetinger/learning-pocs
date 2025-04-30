import { serve } from "bun";

serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

      if (url.pathname === "/events") {
        const stream = new ReadableStream({
          start(controller) {
            // Send a first message
            controller.enqueue(`data: Hello! Server Time: ${new Date().toLocaleTimeString()}\n\n`);

            // Send a message every 2 seconds
            const interval = setInterval(() => {
              // Use call to ensure 'this' is correct
              controller.enqueue.call(controller, `data: Server Time: ${new Date().toLocaleTimeString()}\n\n`);
            }, 2000);

            // Cleanup function
            const cleanup = () => clearInterval(interval);

            // Return cleanup on cancel
            return () => cleanup();
          }
        });

        return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    }

    // Serve a basic HTML page
    const html = await Bun.file("index.html").text();
    return new Response(html, {
      headers: { "Content-Type": "text/html" }
    });
  },
});
