let reloadStatus = false;

export function getReloadStatus() {
  return reloadStatus;
}

export function setReloadStatus(status: boolean | null | undefined) {
  if (typeof status === "boolean") {
    reloadStatus = status;
    setTimeout(() => {
      console.log("reload Stats updated");
      reloadStatus = false;
    }, 2000);
    return {
      status: "Success",
    };
  }
  return {
    status: "Failure",
  };
}
