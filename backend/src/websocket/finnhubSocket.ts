import WebSocket, { WebSocketServer } from "ws";
import { Server } from "http";

export function setupWebSocket(server: Server) {
  // --- WebSocket server for frontend clients ---
  const wss = new WebSocketServer({ server });

  // --- Finnhub WebSocket connection ---
  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
  if (!FINNHUB_API_KEY) {
    console.error("FINNHUB_API_KEY is not defined");
    return;
  }

  const FINNHUB_WS_URL = `wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`;
  const finnhubSocket = new WebSocket(FINNHUB_WS_URL);

  // When Finnhub connection opens, subscribe to symbols
  finnhubSocket.on("open", () => {
    finnhubSocket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
    finnhubSocket.send(JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" }));
    finnhubSocket.send(JSON.stringify({ type: "subscribe", symbol: "IC MARKETS:1" }));
  });

  // Forward Finnhub messages to all frontend clients
  finnhubSocket.on("message", (data: WebSocket.RawData) => {
    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });

  // Optionally, handle frontend client connections
  wss.on("connection", (ws: WebSocket) => {
    ws.send(JSON.stringify({ message: "Connected to backend WebSocket" }));
  });
}
