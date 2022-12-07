import { v4 as uuidv4 } from "uuid";

import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { SelectableArgs, selectableArgsMapper, selectableArgTypes } from "./selectable.args";
import { Selectable } from "./selectable.models";

export interface SelectableTemplates<TemplateFnReturnType> {
  selectableTemplate: (selectableProperties: Selectable<TemplateFnReturnType>) => TemplateFnReturnType;
  infoRichContent: TemplateFnReturnType;
}

export function storiesOfSelectable<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    SelectableTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Selectable", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: selectableArgTypes,
      args: {
        type: "radio",
        checked: false,
        disabled: false,
        id: uuidv4(),
        indeterminate: false,
        infoActive: false,
        infoFixed: false,
        invalid: false,
        label: "Label",
        required: false,
        value: "the-value",
      },
    });

    const template = templateMapper<SelectableArgs<TemplateFnReturnType>>(
      (args, { selectableTemplate, infoRichContent }) => selectableTemplate(selectableArgsMapper(args, infoRichContent))
    );

    stories.add("radio", template, {
      args: {
        type: "radio",
      },
    });

    stories.add("checkbox", template, {
      args: {
        type: "checkbox",
      },
    });

    stories.add("with info", template, {
      args: {
        infoFixed: false,
      },
    });

    return stories;
  });
}
