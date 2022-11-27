import { v4 as uuidv4 } from "uuid";

import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { SelectableArgs, selectableArgsMapper, selectableArgTypes } from "./selectable.args";
import { infoRichContent } from "./selectable.content";
import { Selectable } from "./selectable.models";

export interface SelectableTemplates<TemplateFnReturnType> {
  selectableTemplate: (selectableProperties: Selectable<TemplateFnReturnType>) => TemplateFnReturnType;
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

    const template = templateMapper<SelectableArgs<TemplateFnReturnType>>((args, { selectableTemplate }) =>
      selectableTemplate(selectableArgsMapper(args))
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
        infoRichContent,
      },
    });

    return stories;
  });
}
