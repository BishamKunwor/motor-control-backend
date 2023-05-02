import { getBlynkActiveStatus } from "../controller/blynkController";
import { getSwitchStats, setSwitchStats } from "../database/switchStats";

export default async function setSwitchStatsHandler(req: any, res: any) {
  const value = await getBlynkActiveStatus();
  setSwitchStats(value);
  res.status(200).send(getSwitchStats());
}
