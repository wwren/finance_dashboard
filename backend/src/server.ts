import express from "express";
import http from "http";
require("dotenv").config();

import router from "@/rest/routes";
import { setupWebSocket } from "@/websocket/finnhubSocket";

const app = express();
const server = http.createServer(app);

// Register HTTP routes
app.use(router);

// Register WebSocket logic
setupWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
