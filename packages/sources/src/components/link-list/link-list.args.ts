import { ArgTypes } from "../../storybook";

import { LinkList, LinkListType } from "./link-list.models";
import { Anchor } from "../anchor/anchor.models";

export interface LinkListArgs {
  navLabel: string;
  type: LinkListType;
  links: Anchor[];
}

export const linkListArgTypes: ArgTypes<LinkListArgs> = {
  navLabel: {
    control: {
      type: "string",
    },
  },
  type: {
    options: [LinkListType.Ul, LinkListType.Ol],
    control: {
      type: "select",
    },
  },
  links: {
    control: {
      disable: true,
    },
  },
};

export function linkListArgsMapper(a: LinkListArgs): LinkList {
  return {
    ...a,
  };
}
