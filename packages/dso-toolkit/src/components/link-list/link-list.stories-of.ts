import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { LinkListArgs, linkListArgTypes, linkListArgsMapper } from "./link-list.args.js";
import { links, navLinks } from "./link-list.content.js";
import { LinkList, LinkListType } from "./link-list.models.js";

type LinkListStory = StoryObj<LinkListArgs, Renderer>;

interface LinkListStories {
  Ul: LinkListStory;
  Ol: LinkListStory;
  InHighlightBox: LinkListStory;
  InNav: LinkListStory;
  InFooter: LinkListStory;
}

export interface LinkListTemplates<TemplateFnReturnType> {
  linkListTemplate: (linkListProperties: LinkList) => TemplateFnReturnType;

  /**
   * Make sure to render the Link List in every variant:
   * * default (no arguments)
   * * `yellow`
   * * `border`
   * * `drop-shadow white`
   */
  inHighlightBoxTemplate: (linkList: TemplateFnReturnType) => TemplateFnReturnType;

  /**
   * Template to demonstrate the Link List inside footer
   */
  inFooterTemplate: (linkList: TemplateFnReturnType) => TemplateFnReturnType;
}

interface LinkListStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  LinkListTemplates<TemplateFnReturnType>
> {}

export function linkListMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  LinkListArgs
> {
  return {
    argTypes: linkListArgTypes,
    args: {
      links,
    },
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function linkListStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: LinkListStoriesParameters<Implementation, Templates, TemplateFnReturnType>): LinkListStories {
  return {
    Ul: {
      args: {
        type: LinkListType.Ul,
      },
      render: templateContainer.render(storyTemplates, (args, { linkListTemplate }) =>
        linkListTemplate(linkListArgsMapper(args)),
      ),
    },
    Ol: {
      args: {
        type: LinkListType.Ol,
      },
      render: templateContainer.render(storyTemplates, (args, { linkListTemplate }) =>
        linkListTemplate(linkListArgsMapper(args)),
      ),
    },
    InHighlightBox: {
      render: templateContainer.render(storyTemplates, (args, { inHighlightBoxTemplate, linkListTemplate }) =>
        inHighlightBoxTemplate(linkListTemplate(linkListArgsMapper(args))),
      ),
    },
    InNav: {
      args: {
        links: navLinks,
        navLabel: "Projecttaken",
        type: LinkListType.Ul,
      },
      render: templateContainer.render(storyTemplates, (args, { linkListTemplate }) =>
        linkListTemplate(linkListArgsMapper(args)),
      ),
    },
    InFooter: {
      render: templateContainer.render(storyTemplates, (args, { inFooterTemplate, linkListTemplate }) =>
        inFooterTemplate(linkListTemplate(linkListArgsMapper(args))),
      ),
    },
  };
}
