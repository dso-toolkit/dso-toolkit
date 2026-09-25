import { type LinkList, LinkListType } from "../../../components/link-list/link-list.models.js";

export function linkList(): LinkList {
  return {
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
}
