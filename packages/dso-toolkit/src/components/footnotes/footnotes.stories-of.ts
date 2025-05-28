import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { componentArgs } from "../../storybook";
import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import {
  FootnotesExampleArgs,
  FootnotesListArgs,
  FootnotesReferenceArgs,
  footnotesExampleArgTypes,
  footnotesListArgTypes,
  footnotesListArgsMapper,
  footnotesReferenceArgTypes,
  footnotesReferenceArgsMapper,
} from "./footnotes.args.js";
import { footnotes } from "./footnotes.content.js";
import { Footnote } from "./footnotes.models.js";

interface FootnotesStories {
  Example: StoryObj<FootnotesExampleArgs, Renderer>;
  Reference: StoryObj<FootnotesReferenceArgs, Renderer>;
  List: StoryObj<FootnotesListArgs, Renderer>;
}

export interface FootnotesTemplates<TemplateFnReturnType> {
  footnoteTemplate: (footnote: Footnote) => TemplateFnReturnType;
  footnotesTemplate: (footnotes: Footnote[]) => TemplateFnReturnType;
  footnotesExampleTemplate: (footnote14: Footnote, footnote15: Footnote, list: Footnote[]) => TemplateFnReturnType;
}

interface FootnotesStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    FootnotesTemplates<TemplateFnReturnType>
  > {}

export function footnotesMeta<TRenderer extends Renderer>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer> {
  return {
    argTypes: {},
    args: {},
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function footnotesStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: FootnotesStoriesParameters<Implementation, Templates, TemplateFnReturnType>): FootnotesStories {
  return {
    Example: {
      argTypes: footnotesExampleArgTypes,
      args: {
        footnote14: footnotes[0],
        footnote15: footnotes[1],
        footnotes,
      },
      render: templateContainer.render(storyTemplates, (args, { footnotesExampleTemplate }) =>
        footnotesExampleTemplate(args.footnote14, args.footnote15, footnotes),
      ),
    },
    Reference: {
      argTypes: footnotesReferenceArgTypes,
      args: {
        label: footnotes[0]?.label,
        number: footnotes[0]?.number,
      },
      render: templateContainer.render(storyTemplates, (args, { footnoteTemplate }) =>
        footnoteTemplate(footnotesReferenceArgsMapper(args)),
      ),
    },
    List: {
      argTypes: footnotesListArgTypes,
      args: componentArgs<FootnotesListArgs>({
        footnotes,
      }),
      render: templateContainer.render(storyTemplates, (args, { footnotesTemplate }) =>
        footnotesTemplate(footnotesListArgsMapper(args)),
      ),
    },
  };
}
