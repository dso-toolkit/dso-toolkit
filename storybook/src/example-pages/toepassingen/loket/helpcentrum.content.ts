import { LinkList, LinkListType } from "../../../components/link-list/link-list.models.js";

export function linkList(): LinkList {
  return {
    type: LinkListType.Ul,
    links: [
      {
        label: "Help content item 1",
        url: "#",
      },
      {
        label: "Help content item 2",
        url: "#",
      },
      {
        label: "Help content item 3",
        url: "#",
      },
    ],
  };
}
