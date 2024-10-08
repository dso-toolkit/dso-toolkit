import { LinkList, LinkListType, HeaderMenuItem } from "dso-toolkit";

export const mainMenu: HeaderMenuItem[] = [
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
