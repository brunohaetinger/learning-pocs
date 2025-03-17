import htmlWorkers from './index.html';
import workerJS from './service-worker';

console.log("Hello via Bun!");


Bun.serve({
  // `routes` requires Bun v1.2.3+
  routes: {
   "/health-check": () => new Response("ok!"),
    // Per-HTTP method handlers
    "/api/posts": {
      GET: () => new Response("List posts"),
      POST: async req => {
        const body = await req.json();
        return Response.json({ created: true, ...body });
      },
    },


    // Serve a file by buffering it in memory
    "/service-worker.js": workerJS,
    "/": htmlWorkers,
  },

  // (optional) fallback for unmatched routes:
  // Required if Bun's version < 1.2.3
  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});
