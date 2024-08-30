import { ComponentAnnotations, Renderer } from "@storybook/types";
import { componentArgs } from "../../storybook";

import { ozonContentArgTypes, ozonContentArgsMapper, OzonContentArgs } from "./ozon-content.args.js";
import { OzonContent } from "./ozon-content.models.js";
import { StoriesParameters, StoryObj } from "../../template-container";
import { MetaOptions } from "../../storybook/meta-options.interface";
import { compiler } from "markdown-to-jsx";

import { content } from "./ozon-content.content.js";

export type OzonContentStory = StoryObj<OzonContentArgs, Renderer>;

export interface OzonContentStories {
  Al: OzonContentStory;
  Inhoud: OzonContentStory;
  Opschrift: OzonContentStory;
  Lijst: OzonContentStory;
  IntRef: OzonContentStory;
  ExtRef: OzonContentStory;
  IntIoRef: OzonContentStory;
  ExtIoRef: OzonContentStory;
  InhoudAlNoot: OzonContentStory;
  Figuur: OzonContentStory;
  Table: OzonContentStory;
  TableMetNoot: OzonContentStory;
  TableMetThead: OzonContentStory;
  TableMetBron: OzonContentStory;
  TableZonderColsepEnMetRowsep: OzonContentStory;
  ComplexeTableZonderColsepEnMetRowsep: OzonContentStory;
  RenvooiWeergave: OzonContentStory;
}

interface OzonContentStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    OzonContentTemplates<TemplateFnReturnType>
  > {}

export interface OzonContentTemplates<TemplateFnReturnType> {
  ozonContentTemplate: (ozonContentProperties: OzonContent) => TemplateFnReturnType;
}

export function ozonContentMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  OzonContentArgs
> {
  return {
    argTypes: ozonContentArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function ozonContentStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: OzonContentStoriesParameters<Implementation, Templates, TemplateFnReturnType>): OzonContentStories {
  const render = templateContainer.render(storyTemplates, (args: OzonContentArgs, { ozonContentTemplate }) =>
    ozonContentTemplate(ozonContentArgsMapper(args)),
  );

  return content.reduce((c, { title, content, args }) => {
    c[title] = {
      args: componentArgs<Omit<OzonContentArgs, "dsoAnchorClick" | "dsoClick" | "dsoOzonContentMarkItemHighlight">>({
        content,
        inline: false,
        ...args,
      }),
      render,
    };

    return c;
  }, {} as OzonContentStories);
}
