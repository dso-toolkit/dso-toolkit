import { LinkList, LinkListType } from "dso-toolkit";

export const mainMenu = [
  {
    label: "Home",
    url: "#",
  },
  {
    label: "Vergunningscheck",
    url: "#",
  },
  {
    label: "Aanvragen",
    url: "#",
  },
  {
    label: "Regels op de kaart",
    url: "#",
  },
  {
    label: "Mijn Omgevingsloket",
    url: "#",
    active: true,
  },
];

export const linkList: LinkList = {
  navLabel: "Projecttaken",
  type: LinkListType.Ul,
  links: [
    {
      label: "Ingediende verzoeken",
      url: "#",
      ariaCurrent: "page",
    },
    {
      label: "Verder met aanvragen",
      url: "#",
    },
    {
      label: "Opgeslagen Vergunningscheck",
      url: "#",
    },
    {
      label: "Opgeslagen Maatregel op maat",
      url: "#",
    },
    {
      label: "Deelnemers",
      url: "#",
    },
  ],
};
