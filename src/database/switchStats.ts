let switchStats: "ON" | "OFF" = "OFF";

export function getSwitchStats() {
  return switchStats;
}

export function setSwitchStats(status: "ON" | "OFF" | null | undefined) {
  if (typeof status === "string") {
    switchStats = status;
  }
}
