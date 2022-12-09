import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import {
  AttachmentsCounterArgs,
  attachmentsCounterArgsMapper,
  attachmentsCounterArgTypes,
} from "./attachments-counter.args.js";
import { AttachmentsCounter } from "./attachments-counter.models.js";

export interface AttachmentsCounterTemplates<TemplateFnReturnType> {
  attachmentsCounterTemplate: (attachmentsCounterProperties: AttachmentsCounter) => TemplateFnReturnType;
}

export function storiesOfAttachmentsCounter<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    AttachmentsCounterTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Attachments Counter", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: attachmentsCounterArgTypes,
    });

    const template = templateMapper<AttachmentsCounterArgs>((args, { attachmentsCounterTemplate }) =>
      attachmentsCounterTemplate(attachmentsCounterArgsMapper(args))
    );

    stories.add("Attachments Counter", template, {
      args: {
        count: 3,
      },
    });

    return stories;
  });
}
