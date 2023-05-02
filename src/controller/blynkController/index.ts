import { setSwitchStats } from "../../database/switchStats";

let timeout: any;

export async function updateSwitch(status: "ON" | "OFF", time: number) {
  setSwitchStats(status);
  const response = await fetch(
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
      setSwitchStats("OFF");
      fetch(
        `${process.env.NEXT_PUBLIC_BLYNK_BASE_URL}/external/api/update?token=${
          process.env.NEXT_PUBLIC_BLYNK_TOKEN
        }&${process.env.NEXT_PUBLIC_NODEMCU_PIN}=${0}`
      );
    }, time * 60000);
  } else {
    console.log("clear timout");
    clearTimeout(timeout);
  }
}

export async function getBlynkActiveStatus() {
  let response = (await fetch(
    `${process.env.NEXT_PUBLIC_BLYNK_BASE_URL}/external/api/get?token=${process.env.NEXT_PUBLIC_BLYNK_TOKEN}&${process.env.NEXT_PUBLIC_NODEMCU_PIN}`
  )) as any;
  response = await response.json();

  return response === 1 ? "ON" : "OFF";
}
