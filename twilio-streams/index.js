const WebSocket = require("ws");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

// Handle Web Socket Connection
wss.on("connection", function connection(ws) {
console.log("New Connection Initiated");

   ws.on("message", function incoming(message) {
    const msg = JSON.parse(message);
    switch (msg.event) {
      case "connected":
        console.log(`A new call has connected.`);
        break;
      case "start":
        console.log(`Starting Media Stream ${msg.streamSid}`);
        break;
      case "media":
        console.log(`Receiving Audio...`)
        break;
      case "stop":
        console.log(`Call Has Ended`);
        break;
    }
  });

});

//Handle HTTP Request
app.get("/", (req, res) => res.send("Hello World"));

app.post("/", async (req, res) => {

    // Create TwiML Response
    res.set("Content-Type", "text/xml");
    res.send(`
    <Response>
        <Start>
            <Stream url="wss://${req.headers.host}/"/>
        </Start>
        <Say voice="alice">Hello, start speaking to talk to a virtual operator</Say>
        <Pause length="10"/>
    </Response>
    `);
});

console.log("Listening at Port 8080");
server.listen(8080);
