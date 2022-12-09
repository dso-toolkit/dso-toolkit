import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";
import { HelpcenterPanelArgs, helpcenterPanelArgsMapper, helpcenterPanelArgTypes } from "./helpcenter-panel.args.js";
import { HelpcenterPanel } from "./helpcenter-panel.models.js";

export interface HelpcenterPanelTemplates<TemplateFnReturnType> {
  helpcenterPanelTemplate: (helpcenterPanelProperties: HelpcenterPanel) => TemplateFnReturnType;
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
      templateMapper<HelpcenterPanelArgs>((args, { helpcenterPanelTemplate }) =>
        helpcenterPanelTemplate(helpcenterPanelArgsMapper(args))
      ),
      {
        args: {
          label: "Hulp nodig",
          url:
            window.location.origin +
            `/iframe.html?id=${
              window.location.port === "45000" ? "core-" : ""
            }helpcenter-panel--helpcenter-panel&viewMode=docs`,
        },
      }
    );

    return stories;
  });
}
