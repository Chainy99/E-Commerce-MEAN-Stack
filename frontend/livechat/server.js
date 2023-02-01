import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";
import onSocket from "./socket.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + " "));

const io = new Server(httpServer);
onSocket(io);

const port = process.env.PORT || 8080;
httpServer.listen(port, () => console.log(`Listening on port ${port}...`));
