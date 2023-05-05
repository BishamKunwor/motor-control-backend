import { getBlynkActiveStatus } from "../controller/blynkController";
import { getActiveDate } from "../database/date";
import { getSwitchStats, setSwitchStats } from "../database/switchStats";

export default async function getActiveStatusHandler(req: any, res: any) {
  const value = await getBlynkActiveStatus();
  setSwitchStats(value);
  const date = getActiveDate();
  res.status(200).json({ status: getSwitchStats(), time: date });
}
