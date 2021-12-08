import { bindTemplate, StorybookParameters } from "../../stories-helpers";
import {
  helpcenterPanelArgsMapper,
  HelpcenterPanelArgTypes,
} from "./helpcenter-panel.args";
import { HelpcenterPanel } from "./helpcenter-panel.models";

export interface HelpcenterPanelParameters<TemplateFnReturnType> {
  helpcenterPanelTemplate: (
    helpcenterPanelProperties: HelpcenterPanel
  ) => TemplateFnReturnType;
}

export function storiesOfHelpcenterPanel<TemplateFnReturnType>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  { helpcenterPanelTemplate }: HelpcenterPanelParameters<TemplateFnReturnType>
) {
  const stories = storiesOf("HelpcenterPanel", mainModule).addParameters({
    docs: {
      page: readme,
    },
    argTypes: HelpcenterPanelArgTypes,
  });

  stories.add(
    "HelpcenterPanel",
    bindTemplate(helpcenterPanelArgsMapper, helpcenterPanelTemplate),
    {
      args: {
        label: "Hulp nodig",
        url: "/?path=/docs/selectable--checkbox",
      },
    }
  );
}
