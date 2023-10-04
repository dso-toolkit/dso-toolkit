import { WebComponentsRenderer } from "@storybook/web-components";

import { AttachmentsCounterArgs, attachmentsCounterArgsMapper } from "./attachments-counter.args.js";
import { AttachmentsCounter } from "./attachments-counter.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";

type AttachmentsCounterStory = StoryObj<AttachmentsCounterArgs, WebComponentsRenderer>;

interface AttachmentsCounterStories {
  Count: AttachmentsCounterStory;
}

interface AttachmentsCounterStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    AttachmentsCounterTemplates<TemplateFnReturnType>
  > {}

interface AttachmentsCounterTemplates<TemplateFnReturnType> {
  attachmentsCounterTemplate: (attachmentsCounterProperties: AttachmentsCounter) => TemplateFnReturnType;
}

export function attachmentsCounterStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: AttachmentsCounterStoriesParameters<Implementation, Templates, TemplateFnReturnType>): AttachmentsCounterStories {
  return {
    Count: {
      args: {
        count: 3,
      },
      render: templateContainer.render(storyTemplates, (args, { attachmentsCounterTemplate }) =>
        attachmentsCounterTemplate(attachmentsCounterArgsMapper(args))
      ),
    },
  };
}

// export function storiesOfAttachmentsCounter<Implementation, Templates, TemplateFnReturnType>(
//   storiesOfArguments: StoriesOfArguments<
//     Implementation,
//     Templates,
//     TemplateFnReturnType,
//     AttachmentsCounterTemplates<TemplateFnReturnType>
//   >
// ) {
//   return storiesOfFactory("Attachments Counter", storiesOfArguments, (stories, templateMapper) => {
//     stories.addParameters({
//       argTypes: attachmentsCounterArgTypes,
//     });

//     const template = templateMapper<AttachmentsCounterArgs>((args, { attachmentsCounterTemplate }) =>
//       attachmentsCounterTemplate(attachmentsCounterArgsMapper(args))
//     );

//     stories.add("Attachments Counter", template, {
//       args: {
//         count: 3,
//       },
//     });

//     return stories;
//   });
// }
