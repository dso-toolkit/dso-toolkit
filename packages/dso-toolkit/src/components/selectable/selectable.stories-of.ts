import { v4 as uuidv4 } from "uuid";

import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { SelectableArgs, selectableArgsMapper, selectableArgTypes } from "./selectable.args.js";
import { Selectable } from "./selectable.models.js";

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

    stories.add("nested", template, {
      args: {
        options: [
          {
            value: "1.1",
            type: "checkbox",
            label: "Optie op niveau 1 - keuze 1",
            id: "checkbox-sub-1-1",
            name: "checkbox-sub-1",
            checked: true,
            info: {
              active: true,
              content:
                '<div class="dso-rich-content" slot="info"><h4>Toelichting bij antwoord: "Optie op niveau 1 - keuze 1"</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non metus dolor. Pellentesque velit arcu, pellentesque at lacus sit amet, porta semper est.</p></div>',
            },
            options: [
              {
                value: "1.1.1",
                type: "checkbox",
                label: "Optie op niveau 1.1 - keuze 1",
                id: "checkbox-sub-1-1-1",
                name: "checkbox-sub-1-1",
              },
              {
                value: "1.1.2",
                type: "checkbox",
                label: "Optie op niveau 1.1 - keuze 2",
                id: "checkbox-sub-1-1-2",
                name: "checkbox-sub-1-1",
              },
            ],
          },
          {
            value: "1.2",
            type: "checkbox",
            label: "Optie op niveau 1 - keuze 2",
            id: "checkbox-sub-1-2",
            name: "checkbox-sub-1",
            options: [
              {
                value: "1.2.1",
                type: "checkbox",
                label: "Optie op niveau 1.2 - keuze 1",
                id: "checkbox-sub-1-2-1",
                name: "checkbox-sub-1-2",
              },
              {
                value: "1.2.2",
                type: "checkbox",
                label: "Optie op niveau 1.2 - keuze 2",
                id: "checkbox-sub-1-2-2",
                name: "checkbox-sub-1-2",
              },
            ],
          },
          {
            value: "1.3",
            type: "checkbox",
            label: "Optie op niveau 1 - keuze 3",
            id: "checkbox-sub-1-3",
            name: "checkbox-sub-1",
            options: [
              {
                value: "1.3.1",
                type: "radio",
                label: "Optie op niveau 1.3 - keuze 1",
                id: "radio-sub-1-3-1",
                name: "radio-sub-1-3",
              },
              {
                value: "1.3.2",
                type: "radio",
                label: "Optie op niveau 1.3 - keuze 2",
                id: "radio-sub-1-3-2",
                name: "radio-sub-1-3",
              },
            ],
          },
          {
            value: "1.4",
            type: "checkbox",
            label: "Optie op niveau 1 - keuze 4",
            id: "checkbox-sub-1-4",
            name: "checkbox-sub-1",
          },
        ] satisfies Selectable<TemplateFnReturnType>[],
      },
    });

    return stories;
  });
}
