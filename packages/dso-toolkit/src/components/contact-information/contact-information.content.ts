import { ContactInformation } from "./contact-information.models";

export function contactInformationContent<T>(): ContactInformation<T> {
  return {
    heading: {
      level: 5,
      children: "Gemeente Utrecht",
    },
    anchorItems: [
      { label: "14-303", url: "tel:40-303", icon: { icon: "call" } },
      { label: "noreply@dso-toolkit.nl", url: "mailto:no-reply@dso-toolkit.nl", icon: { icon: "email" } },
      {
        label: "Online contactformulier",
        url: "http://www.google.nl",
        icon: { icon: "external-link" },
        mode: "extern",
      },
      { label: "www.utrecht.nl", url: "http://www.utrecht.nl", icon: { icon: "external-link" }, mode: "extern" },
    ],
    infoItems: [
      "Bezoekadres: Stadsplateau 1, 3521AZ Utrecht",
      "Postadres: afd. Bouwvergunningen, Postbus 100, 3500AA Utrecht",
    ],
  };
}
