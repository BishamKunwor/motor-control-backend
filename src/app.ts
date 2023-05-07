import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
// import getActiveStatusHandler from "./api/getActiveStatus";
// import getReloadStatusHandler from "./api/getReloadStatus";
// import setReloadStatusHandler from "./api/setReloadStatus";
// import setSwitchStatsHandler from "./api/setSwitchStats";
// import updateSwitchHandler from "./api/updateSwitch";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import moment from "moment";
import {
  getBlynkActiveStatus,
  updateSwitch,
} from "./controller/blynkController";

dotenv.config();
const port: number = 8080;

let status: {
  switchStats: "ON" | "OFF";
  time: number;
};

(async () => {
  status = {
    switchStats: await getBlynkActiveStatus(),
    time: moment(Date.now()).valueOf(),
  };
})();

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  serveClient: false,
  cors: {
    origin: "*",
  },
});

io.on("connection", async (socket) => {
  console.log("New Client added. ID: ", socket.id);

  // status.switchStats = await getBlynkActiveStatus();

  io.emit("server:status", status);

  socket.on("client:start-stop", async (data) => {
    console.log(data);
    status = {
      switchStats: data.switchStats,
      time: moment(Date.now()).add(data.time, "m").valueOf(),
    };
    io.emit("server:status", status);
    await updateSwitch(data.switchStats, data.time, status, io);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  // res.send("Successfully Running with web-sockets");
  res.json(status);
});

httpServer.listen(port, () => {
  console.log(`Server is Listening on port ${port}...`);
});
