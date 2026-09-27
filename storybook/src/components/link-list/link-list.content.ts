import { Link } from "../link/link.models.js";

export function links(): Link[] {
  return [
    {
      url: "#",
      label: "Externe link",
      mode: "extern",
    },
    {
      url: "#",
      label: "Download",
      mode: "download",
    },
    {
      url: "#",
      label: "Intern link",
    },
  ];
}

export function navLinks(): Link[] {
  return [
    {
      url: "#",
      label: "Ingediende verzoeken",
      ariaCurrent: "page",
    },
    {
      url: "#",
      label: "Verder met aanvragen",
    },
    {
      url: "#",
      label: "Opgeslagen Vergunningscheck",
    },
    {
      url: "#",
      label: "Opgeslagen Maatregel op maat",
    },
    {
      url: "#",
      label: "Deelnemers",
    },
  ];
}
