// import { setSwitchStats } from "../../database/switchStats";

import axios from "axios";

// import moment from "moment";

let timeout: any;

export async function updateSwitch(
  status: "ON" | "OFF",
  time: number,
  stats: {
    switchStats: "ON" | "OFF";
    time: number;
  },
  io: any
) {
  // setSwitchStats(status);
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BLYNK_BASE_URL}/external/api/update?token=${
      process.env.NEXT_PUBLIC_BLYNK_TOKEN
    }&${process.env.NEXT_PUBLIC_NODEMCU_PIN}=${
      status.toLocaleLowerCase() === "on" ? 1 : 0
    }`
  );
  if (status === "ON") {
    console.log("status on runned");
    timeout = setTimeout(() => {
      console.log("settimeout called");
      // setSwitchStats("OFF");
      axios.get(
        `${process.env.NEXT_PUBLIC_BLYNK_BASE_URL}/external/api/update?token=${
          process.env.NEXT_PUBLIC_BLYNK_TOKEN
        }&${process.env.NEXT_PUBLIC_NODEMCU_PIN}=${0}`
      );
      stats.switchStats = "OFF";
      io.emit("server:status", status);
    }, time * 60000);
  } else {
    console.log("clear timout");
    clearTimeout(timeout);
  }
}

export async function getBlynkActiveStatus(): Promise<"ON" | "OFF"> {
  // let response = (await fetch(
  //   `${process.env.NEXT_PUBLIC_BLYNK_BASE_URL}/external/api/get?token=${process.env.NEXT_PUBLIC_BLYNK_TOKEN}&${process.env.NEXT_PUBLIC_NODEMCU_PIN}`
  // )) as any;
  // response = await response.json();

  // return response === 1 ? "ON" : "OFF";

  let response = await axios.get(
    `${process.env.NEXT_PUBLIC_BLYNK_BASE_URL}/external/api/get?token=${process.env.NEXT_PUBLIC_BLYNK_TOKEN}&${process.env.NEXT_PUBLIC_NODEMCU_PIN}`
  );
  // console.log(response.data);
  // return "ON";
  return response.data === 1 ? "ON" : "OFF";
}
