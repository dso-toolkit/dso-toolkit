import { AlertStatus } from "dso-toolkit";

export const alerts = [
  {
    status: AlertStatus.Warning,
    message:
      "Verander de instantie alleen als u zeker weet dat die niet klopt. Als u iets verandert, duurt het afhandelen van uw aanvraag mogelijk langer.",
  },
  {
    status: AlertStatus.Info,
    message: "We hebben van uw aanvraag meerdere verzoeken gemaakt. Hier ziet u waar u de verzoeken indient.",
  },
];
