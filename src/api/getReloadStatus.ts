import { getReloadStatus } from "../database/reloadStats";

type Data = {
  reloadStatus: boolean;
};

export default function getReloadStatusHandler(req: any, res: any) {
  const status = getReloadStatus();
  res.status(200).json({ reloadStatus: status });
}
