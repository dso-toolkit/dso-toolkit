import { ComponentAnnotations, Renderer } from "@storybook/types";

import { ListArgs, listArgsMapper, listArgTypes } from "./list.args.js";
import { List, Type } from "./list.models.js";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

type ListStory = StoryObj<ListArgs, Renderer>;

interface ListStories {
  Columns: ListStory;
  Group: ListStory;
  Icons: ListStory;
  ImageList: ListStory;
  Ordered: ListStory;
  Unordered: ListStory;
  Unstyled: ListStory;
}

export interface ListTemplates<TemplateFnReturnType> {
  listTemplate: (listProperties: List) => TemplateFnReturnType;
}

interface ListStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, ListTemplates<TemplateFnReturnType>> {}

export function listMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ListArgs
> {
  return {
    argTypes: listArgTypes,
    args: {
      items: [
        { text: "Cras justo odio" },
        { text: "Dapibus ac facilisis in" },
        { text: "Morbi leo risus" },
        { text: "Porta ac consectetur ac" },
        { text: "Vestibulum at eros" },
      ],
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

export function listStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ListStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ListStories {
  const render = templateContainer.render(storyTemplates, (args: ListArgs, { listTemplate }) =>
    listTemplate(listArgsMapper(args)),
  );
  return {
    Unordered: {
      args: {
        type: Type.Ul,
      },
      render,
    },
    Ordered: {
      args: {
        type: Type.Ol,
      },
      render,
    },
    Group: {
      args: {
        type: Type.Ul,
        modifier: "group",
      },
      render,
    },
    Columns: {
      args: {
        type: Type.Ul,
        modifier: "columns",
      },
      render,
    },
    ImageList: {
      args: {
        type: Type.Ul,
        modifier: "img-list",
        items: [
          {
            text: "Cras justo odio",
            imgSrc: "images/rectangle1.png",
          },
          {
            text: "Dapibus ac facilisis in",
            imgSrc: "images/rectangle2.png",
          },
          {
            text: "Morbi leo risus",
            imgSrc: "images/rectangle1.png",
          },
          {
            text: "Porta ac consectetur ac",
            imgSrc: "images/rectangle2.png",
          },
          {
            text: "Vestibulum at eros",
            imgSrc: "images/rectangle1.png",
          },
        ],
      },
      render,
    },
    Unstyled: {
      args: {
        type: Type.Ul,
        modifier: "unstyled",
      },
      render,
    },
    Icons: {
      args: {
        type: Type.Ul,
        items: [
          {
            text: "Cras justo odio",
          },
          {
            text: "Dapibus ac facilisis in",
            status: "forbidden",
            statusDescription: "Niet beschikbaar",
          },
          {
            text: "Morbi leo risus",
          },
          {
            text: "Porta ac consectetur ac",
            status: "status-warning",
            statusDescription: "Let op",
          },
          {
            text: "Vestibulum at eros",
          },
        ],
      },
      render,
    },
  };
}
