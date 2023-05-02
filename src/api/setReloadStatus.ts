import { setReloadStatus } from "../database/reloadStats";

export default function setReloadStatusHandler(req: any, res: any) {
  if (req.method === "POST") {
    res.status(200).json(setReloadStatus(req.body?.status));
    return;
  }
  res.status(400).json({
    status: "Failure",
  });
}
