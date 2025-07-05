import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { ParagraphArgs, paragraphArgTypes, paragraphArgsMapper } from "./paragraph.args.js";
import { defaultContent, disclaimerContent } from "./paragraph.content.js";
import { Paragraph } from "./paragraph.models.js";

type ParagraphStory = StoryObj<ParagraphArgs, Renderer>;

interface ParagraphStories {
  Default: ParagraphStory;
  Disclaimer: ParagraphStory;
}

interface ParagraphStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ParagraphTemplates<TemplateFnReturnType>
  > {}

interface ParagraphTemplates<TemplateFnReturnType> {
  paragraphTemplate: (paragraphProperties: Paragraph) => TemplateFnReturnType;
}

export function paragraphMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ParagraphArgs
> {
  return {
    argTypes: paragraphArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function paragraphStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ParagraphStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ParagraphStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { paragraphTemplate }) =>
        paragraphTemplate(paragraphArgsMapper(args, defaultContent)),
      ),
    },
    Disclaimer: {
      args: {
        variant: "disclaimer",
      },
      render: templateContainer.render(storyTemplates, (args, { paragraphTemplate }) =>
        paragraphTemplate(paragraphArgsMapper(args, disclaimerContent)),
      ),
    },
  };
}
