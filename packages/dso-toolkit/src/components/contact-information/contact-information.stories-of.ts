import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters2, StoryObj } from "../../template-container";

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

interface ContactInformationStoriesParameters<TemplateFnReturnType> extends StoriesParameters2<
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

export function contactInformationStories<TemplateFnReturnType>({
  storyTemplates,
}: ContactInformationStoriesParameters<TemplateFnReturnType>): ContactInformationStories {
  return {
    Default: {
      render: (_args) =>
        storyTemplates().contactInformationTemplate({
          ...contactInformationContent,
          heading: {
            level: 4,
            children: "Gemeente Utrecht",
          },
        }),
    },
  };
}
