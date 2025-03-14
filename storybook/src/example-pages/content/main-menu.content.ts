import { HeaderMenuItem } from "dso-toolkit";

export function mainMenu(label?: string): HeaderMenuItem[] {
  return [
    {
      label: "Home",
      url: "#",
      active: label === "Home",
    },
    {
      label: "Vergunningscheck",
      url: "#",
      active: label === "Vergunningscheck",
    },
    {
      label: "Aanvragen",
      url: "#",
      active: label === "Aanvragen",
    },
    {
      label: "Regels op de kaart",
      url: "#",
      active: label === "Regels op de kaart",
    },
    {
      label: "Maatregelen op maat",
      url: "#",
      active: label === "Maatregelen op maat",
    },
  ];
}
