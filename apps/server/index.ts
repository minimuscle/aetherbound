const server = Bun.serve({
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    open(ws) {
      ws.send("Connection established");
      console.log("WebSocket opened");
    },
    close(ws, code, reason) {
      console.log("WebSocket closed", code, reason);
    },
    message(ws, message) {
      console.log("WebSocket message", message);
      ws.send(message);
    },
  },
});

console.log(`Listening on http://localhost:${server.port}/`);
