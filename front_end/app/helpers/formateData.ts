export interface AlertMessageType {
  type: "success" | "danger" | "warning" | "info";
  title: string;
  message: string;
}

export const formatStatus = (
  status: "pending"|"completed"|"cancelled"|"active",
  t: (key: string) => string
) => {
  let text = "success";
  let color = "success";

  switch (status) {
    case "pending":
      text = t("sales.columns.status.pending");
      color = "warning";
      break;

    case "completed":
      text = t("sales.columns.status.completed");
      color = "success";
      break;

     case "active":
      text = t("sales.columns.status.active");
      color = "primary";
      break;

    case "cancelled":
      text = t("sales.columns.status.cancelled");
      color = "danger";
      break;
  }

  return { text, color };
};


export const getAlertType = (
  priorityScore: number
): AlertMessageType["type"] => {
  if (priorityScore >= 90) {
    return "danger";
  }

  if (priorityScore >= 40) {
    return "warning";
  }

  return "info";
};
