import { Alert } from "dso-toolkit";
import { TemplateResult } from "lit-html";

export const alerts: Alert<TemplateResult>[] = [
  {
    status: "warning",
    message:
      "Verander de instantie alleen als u zeker weet dat die niet klopt. Als u iets verandert, duurt het afhandelen van uw aanvraag mogelijk langer.",
  },
  {
    status: "info",
    message: "We hebben van uw aanvraag meerdere verzoeken gemaakt. Hier ziet u waar u de verzoeken indient.",
  },
];
