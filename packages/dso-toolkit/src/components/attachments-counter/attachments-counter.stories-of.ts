import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import {
  AttachmentsCounterArgs,
  attachmentsCounterArgTypes,
  attachmentsCounterArgsMapper,
} from "./attachments-counter.args.js";
import { AttachmentsCounter } from "./attachments-counter.models.js";

type AttachmentsCounterStory = StoryObj<AttachmentsCounterArgs, Renderer>;

interface AttachmentsCounterStories {
  AttachmentsCounter: AttachmentsCounterStory;
}

interface AttachmentsCounterStoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  AttachmentsCounterTemplates<TemplateFnReturnType>
> {}

interface AttachmentsCounterTemplates<TemplateFnReturnType> {
  attachmentsCounterTemplate: (attachmentsCounterProperties: AttachmentsCounter) => TemplateFnReturnType;
}

export function attachmentsCounterMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  AttachmentsCounterArgs
> {
  return {
    argTypes: attachmentsCounterArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function attachmentsCounterStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: AttachmentsCounterStoriesParameters<Implementation, Templates, TemplateFnReturnType>): AttachmentsCounterStories {
  return {
    AttachmentsCounter: {
      args: {
        count: 3,
      },
      render: templateContainer.render(storyTemplates, (args, { attachmentsCounterTemplate }) =>
        attachmentsCounterTemplate(attachmentsCounterArgsMapper(args)),
      ),
    },
  };
}
