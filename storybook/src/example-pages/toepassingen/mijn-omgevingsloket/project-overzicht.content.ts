import { LinkList, LinkListType } from "dso-toolkit";

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
