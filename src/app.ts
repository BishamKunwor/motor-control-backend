import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
import getActiveStatusHandler from "./api/getActiveStatus";
import getReloadStatusHandler from "./api/getReloadStatus";
import setReloadStatusHandler from "./api/setReloadStatus";
import setSwitchStatsHandler from "./api/setSwitchStats";
import updateSwitchHandler from "./api/updateSwitch";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app: Application = express();
const port: number = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Successfully Running");
});

app.get("/api/getActiveStatus", getActiveStatusHandler);
app.get("/api/getReloadStatus", getReloadStatusHandler);
app.post("/api/setReloadStatus", setReloadStatusHandler);
app.get("/api/setSwitchStats", setSwitchStatsHandler);
app.post("/api/updateSwitch", updateSwitchHandler);

app.listen(port);
