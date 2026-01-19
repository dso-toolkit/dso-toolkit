import { TemplateResult } from "lit-html";

import { ContactInformation } from "./contact-information.models";

export const contactInformationContent: ContactInformation<TemplateResult> = {
  linkItems: [
    { label: "14-303", url: "tel:40-303", icon: { icon: "call" } },
    { label: "noreply@dso-toolkit.nl", url: "mailto:no-reply@dso-toolkit.nl", icon: { icon: "mail-outline" } },
    {
      label: "Online contactformulier",
      url: "https://www.google.nl",
      icon: { icon: "external-link" },
      mode: "extern",
    },
    { label: "www.utrecht.nl", url: "https://www.utrecht.nl", icon: { icon: "external-link" }, mode: "extern" },
  ],
  infoItems: [
    "Bezoekadres: Stadsplateau 1, 3521AZ Utrecht",
    "Postadres: afd. Bouwvergunningen, Postbus 100, 3500AA Utrecht",
  ],
};
