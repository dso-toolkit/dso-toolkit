import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { ListArgs, listArgTypes, listArgsMapper } from "./list.args.js";
import { List, Type } from "./list.models.js";

type ListStory = StoryObj<ListArgs, Renderer>;

interface ListStories {
  Columns: ListStory;
  Group: ListStory;
  Icons: ListStory;
  ImageList: ListStory;
  OrderedAction: ListStory;
  UnorderedAction: ListStory;
  Ordered: ListStory;
  Unordered: ListStory;
  Unstyled: ListStory;
}

export interface ListTemplates<TemplateFnReturnType> {
  listTemplate: (listProperties: List) => TemplateFnReturnType;
}

interface ListStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  ListTemplates<TemplateFnReturnType>
> {}

export function listMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ListArgs
> {
  return {
    argTypes: listArgTypes,
    args: {
      items: [
        { text: "Ingediende verzoeken" },
        { text: "Verder met aanvragen" },
        { text: "Opgeslagen Vergunningscheck" },
        { text: "Opgeslagen Maatregel op maat" },
        { text: "Ingediende verzoeken" },
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
            text: "Ingediende verzoeken",
            imgSrc: "images/rectangle1.png",
          },
          {
            text: "Verder met aanvragen",
            imgSrc: "images/rectangle2.png",
          },
          {
            text: "Opgeslagen Vergunningscheck",
            imgSrc: "images/rectangle1.png",
          },
          {
            text: "Opgeslagen Maatregel op maat",
            imgSrc: "images/rectangle2.png",
          },
          {
            text: "Ingediende verzoeken",
            imgSrc: "images/rectangle1.png",
          },
        ],
      },
      render,
    },
    OrderedAction: {
      args: {
        type: Type.Ol,
        modifier: "ordered-action",
        items: [
          { titleLabel: "Ingediende verzoeken", text: "Bekijk hier de ngediende verzoeken" },
          { titleLabel: "Verder met aanvragen", text: "Bekijk hier aanvragen" },
          { titleLabel: "Opgeslagen Vergunningscheck", text: 'Ga verder met de opgeslagen vergunningscheck"' },
          { titleLabel: "Opgeslagen Maatregel op maat", text: "Ga verder met de opgeslagen Maatregel op maat" },
          { titleLabel: "Ingediende verzoeken", text: "Bekijk ingediende verzoeken" },
        ],
      },
      argTypes: {
        type: {
          control: {
            disable: true,
          },
        },
      },
      render,
    },
    UnorderedAction: {
      args: {
        type: Type.Ul,
        modifier: "unordered-action",
        items: [
          { titleLabel: "Ingediende verzoeken", text: "Bekijk hier de ngediende verzoeken" },
          { titleLabel: "Verder met aanvragen", text: "Bekijk hier aanvragen" },
          { titleLabel: "Opgeslagen Vergunningscheck", text: 'Ga verder met de opgeslagen vergunningscheck"' },
          { titleLabel: "Opgeslagen Maatregel op maat", text: "Ga verder met de opgeslagen Maatregel op maat" },
          { titleLabel: "Ingediende verzoeken", text: "Bekijk ingediende verzoeken" },
        ],
      },
      argTypes: {
        type: {
          control: {
            disable: true,
          },
        },
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
