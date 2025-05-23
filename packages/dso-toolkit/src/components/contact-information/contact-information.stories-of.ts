import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { contactInformationContent } from "./contact-information.content";
import { ContactInformation } from "./contact-information.models";

interface ContactInformationStories {
  Default: StoryObj<Record<string, never>, Renderer>;
}

interface ContactInformationTemplates<TemplateFnReturnType> {
  contactInformationTemplate: (
    contactInformationProperties: ContactInformation<TemplateFnReturnType>,
  ) => TemplateFnReturnType;
}

interface ContactInformationStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ContactInformationTemplates<TemplateFnReturnType>
  > {}

export function contactInformationMeta<TRenderer extends Renderer>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer> {
  return {
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function contactInformationStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ContactInformationStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ContactInformationStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (_args, { contactInformationTemplate }) =>
        contactInformationTemplate({
          ...contactInformationContent,
          heading: {
            level: 4,
            children: "Gemeente Utrecht",
          },
        }),
      ),
    },
  };
}
