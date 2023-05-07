import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
import getActiveStatusHandler from "./api/getActiveStatus";
import getReloadStatusHandler from "./api/getReloadStatus";
import setReloadStatusHandler from "./api/setReloadStatus";
import setSwitchStatsHandler from "./api/setSwitchStats";
import updateSwitchHandler from "./api/updateSwitch";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const port: number = 8080;

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { serveClient: false });

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Successfully Running with web-sockets");
});

// app.get("/api/getActiveStatus", getActiveStatusHandler);
// app.get("/api/getReloadStatus", getReloadStatusHandler);
// app.post("/api/setReloadStatus", setReloadStatusHandler);
// app.get("/api/setSwitchStats", setSwitchStatsHandler);
// app.post("/api/updateSwitch", updateSwitchHandler);

// app.listen(port);
httpServer.listen(port, () => {
  console.log(`Server is Listening on port ${port}...`);
});
