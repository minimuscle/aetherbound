import { registerRoutes } from "./app/endpoints";

const server = Bun.serve({
  routes: registerRoutes,
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }
    return new Response("Not Found", { status: 404 });
  },
  websocket: {
    open(ws) {
      ws.send("Connection established");
      console.log("WebSocket opened");
    },
    close(ws, code, reason) {
      console.log("WebSocket closed", code, reason, ws);
    },
    message(ws, message) {
      console.log("WebSocket message", message);
      ws.send(message);
    },
  },
});
console.log(process.env.DATABASE_URL);

console.log(`Listening on http://localhost:${server.port}/`);
