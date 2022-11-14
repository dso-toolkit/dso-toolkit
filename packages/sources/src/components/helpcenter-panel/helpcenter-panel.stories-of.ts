import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";
import { HelpcenterPanelArgs, helpcenterPanelArgsMapper, helpcenterPanelArgTypes } from "./helpcenter-panel.args";
import { HelpcenterPanel } from "./helpcenter-panel.models";

export interface HelpcenterPanelTemplates<TemplateFnReturnType> {
  helpcenterPanelTemplate: (helpcenterPanelProperties: HelpcenterPanel<TemplateFnReturnType>) => TemplateFnReturnType;
  content: TemplateFnReturnType;
}

export function storiesOfHelpcenterPanel<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    HelpcenterPanelTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Helpcenter Panel", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: helpcenterPanelArgTypes,
    });

    stories.add(
      "Helpcenter Panel",
      templateMapper<HelpcenterPanelArgs>((args, { helpcenterPanelTemplate, content }) =>
        helpcenterPanelTemplate(helpcenterPanelArgsMapper(args, content))
      ),
      {
        args: {
          label: "Hulp nodig",
          url: window.location.origin + "/iframe.html?id=core-helpcenter-panel--helpcenter-panel&viewMode=docs",
        },
      }
    );
  });
}
