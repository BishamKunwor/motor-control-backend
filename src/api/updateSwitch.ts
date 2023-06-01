import { updateSwitch } from "../controller/blynkController";
import { getActiveDate, setActiveDate } from "../database/date";
import { getSwitchStats } from "../database/switchStats";

export default function updateSwitchHandler(req: any, res: any) {
  console.log(req.body);
  if (req.method === "POST") {
    if (req.body.status === "ON") {
      setActiveDate(req.body.time);
    }
    //@ts-ignore please check this for future update`
    updateSwitch(req.body?.status, req.body?.time);
    const newDate = getActiveDate();
    res.status(200).json({
      status: getSwitchStats(),
      time: newDate,
    });
    return;
  }
  res.status(400).json({
    status: getSwitchStats(),
    time: getActiveDate(),
  });
}
