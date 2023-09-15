const WebSocket = require('ws');
const http = require('http');
const express = require('express'); // Import Express

const app = express(); // Create an Express app
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  // Handle WebSocket events here
});

const PORT = 8001;

server.listen(PORT, () => {
  console.log(`WebSocket server is listening on port ${PORT}`);
});
