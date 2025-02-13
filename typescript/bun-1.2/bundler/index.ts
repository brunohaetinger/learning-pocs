import homepage from "./index.html";

Bun.serve({
  static: {
    "/": homepage,
  },
  development: true,

  async fetch(req) {
    // ...api requests
    return new Response("hello world");
  },
});