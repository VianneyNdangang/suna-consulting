export interface AlertMessageType {
  type: "success" | "danger" | "warning" | "info";
  title: string;
  message: string;
}

export const formatStatus = (
  status: "pending" | "completed" | "cancelled" | "active",
  t: (key: string) => string,
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


export const statusLabel = (status?: string) =>
  ({ ended: "Terminée", canceled: "Annulée", pending: "En attente" })[
    status || ""
  ] || "En cours";
export const statusColor = (status?: string) =>
  status === "ended"
    ? "success"
    : status === "canceled"
      ? "error"
      : status === "pending"
        ? "info"
        : "warning";

export const urgencyLabel = (urgency?: string) =>
  ({
    normal: "Normal (1-2 semaines)",
    urgent: "Urgent (dans la semaine)",
    veryUrgent: "Très urgent (48h-72h)",
  })[urgency || ""] || "Normal";

export const urgencyColor = (urgency?: string) =>
  urgency === "veryUrgent"
    ? "error"
    : urgency === "urgent"
      ? "warning"
      : urgency === "normal"
        ? "success"
        : "info";

export const formatDate = (
  date: string | Date,
): string => {
  const dateValue = new Date(date)
  const {locale} = useI18n() 

  if (Number.isNaN(dateValue.getTime())) {
    return ''
  }

  const localeMap: Record<string, string> = {
    fr: 'fr-FR',
    en: 'en-US',
  }

  return new Intl.DateTimeFormat(localeMap[locale.value], {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(dateValue)
}