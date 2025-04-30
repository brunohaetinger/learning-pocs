import { serve } from "bun";

serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);

      if (url.pathname === "/events") {
        const stream = new ReadableStream({
          start(controller) {
            // Send a first message
            controller.enqueue(`data: Hello! Server Time: ${new Date().toLocaleTimeString()}\n\n`);

            // Send a message every 2 seconds
            const interval = setInterval(() => {
              controller.enqueue(`data: Server Time: ${new Date().toLocaleTimeString()}\n\n`);
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
    return new Response(`
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <h1>Server-Sent Events Demo</h1>
        <ul id="messages"></ul>

        <script>
          const evtSource = new EventSource("/events");

          evtSource.onmessage = function(event) {
            const li = document.createElement("li");
            li.textContent = event.data;
            document.getElementById("messages").appendChild(li);
          };
        </script>
      </body>
      </html>
    `, {
      headers: { "Content-Type": "text/html" }
    });
  },
});
