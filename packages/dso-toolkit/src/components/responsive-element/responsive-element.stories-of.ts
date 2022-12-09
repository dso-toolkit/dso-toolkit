import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { ResponsiveElementArgs, responsiveElementArgTypes } from "./responsive-element.args.js";

const demoGrid = [
  ["col-md-6", "col-md-6"],
  ["col-lg-3 col-md-6 col-xs-12", "col-lg-9 col-md-6 col-xs-12"],
  ["col-lg-12"],
  ["col-xs-3", "col-xs-3", "col-xs-3", "col-xs-3"],
];

type ResponsiveElementTemplateFnType<TemplateFnReturnType> = (
  dsoSizeChange: (event: CustomEvent<string>) => void,
  grid: string[][]
) => TemplateFnReturnType;

export interface ResponsiveElementTemplates<TemplateFnReturnType> {
  gridTemplate: ResponsiveElementTemplateFnType<TemplateFnReturnType>;
}

export function storiesOfResponsiveElement<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ResponsiveElementTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Responsive Element", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: responsiveElementArgTypes,
    });

    stories.add(
      "Responsive Element",
      templateMapper<ResponsiveElementArgs>((args, { gridTemplate }) => gridTemplate(args.dsoSizeChange, demoGrid))
    );

    return stories;
  });
}
