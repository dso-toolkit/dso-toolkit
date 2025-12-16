import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { v4 as uuidv4 } from "uuid";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { SelectableArgs, selectableArgTypes, selectableArgsMapper } from "./selectable.args.js";
import { Selectable } from "./selectable.models.js";

type SelectableStory<TemplateFnReturnType> = StoryObj<SelectableArgs<TemplateFnReturnType>, Renderer>;

interface SelectableStories<TemplateFnReturnType> {
  Radio: SelectableStory<TemplateFnReturnType>;
  Checkbox: SelectableStory<TemplateFnReturnType>;
  WithInfo: SelectableStory<TemplateFnReturnType>;
  Nested: SelectableStory<TemplateFnReturnType>;
}

interface SelectableStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  SelectableTemplates<TemplateFnReturnType>
> {}

export interface SelectableTemplates<TemplateFnReturnType> {
  selectableTemplate: (selectableProperties: Selectable<TemplateFnReturnType>) => TemplateFnReturnType;
  infoRichContent: TemplateFnReturnType;
}

export function selectableMeta<TRenderer extends Renderer, TemplateFnReturnType>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer, SelectableArgs<TemplateFnReturnType>> {
  return {
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
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}
export function selectableStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: SelectableStoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType
>): SelectableStories<TemplateFnReturnType> {
  const render = templateContainer.render(
    storyTemplates,
    (args: SelectableArgs<TemplateFnReturnType>, { selectableTemplate, infoRichContent }) =>
      selectableTemplate(selectableArgsMapper(args, infoRichContent)),
  );

  return {
    Radio: {
      args: {
        type: "radio",
      },
      render,
    },
    Checkbox: {
      args: {
        type: "checkbox",
      },
      render,
    },
    WithInfo: {
      args: {
        infoFixed: false,
      },
      render,
    },
    Nested: {
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
                '<div class="dso-rich-content" slot="info"><h4>Toelichting bij antwoord: "Optie op niveau 1 - keuze 1"</h4><p>Het Informatiehuis Bouw kent, op basis van de huidige gebruikerswensen, vier Informatieproducten, namelijk het Opleverdossier, de Bouwregelgeving, de Vergunningvrije bouwwerken en een Digitaliseringshulp.</p></div>',
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
      render,
    },
  };
}
