// import { getBlynkActiveStatus } from "../controller/blynkController";
import { getActiveDate } from "../database/date";
import { getSwitchStats } from "../database/switchStats";

export default async function getActiveStatusHandler(req: any, res: any) {
  // const status = await getBlynkActiveStatus();
  const date = getActiveDate();
  res.status(200).json({ status: getSwitchStats(), time: date });
}
