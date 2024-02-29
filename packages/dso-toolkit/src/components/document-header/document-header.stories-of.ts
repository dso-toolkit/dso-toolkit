import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";
import { DefinitionList } from "../definition-list/definition-list.models.js";

import { DocumentHeaderArgs, documentHeaderArgsMapper, documentHeaderArgTypes } from "./document-header.args.js";
import { DocumentHeader } from "./document-header.models.js";
import { options } from "../advanced-select/advanced-select.content";

export interface DocumentHeaderTemplates<TemplateFnReturnType> {
  documentHeaderTemplate: (documentHeaderProperties: DocumentHeader<TemplateFnReturnType>) => TemplateFnReturnType;
  features: DefinitionList<TemplateFnReturnType>;
}

export function storiesOfDocumentHeader<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DocumentHeaderTemplates<TemplateFnReturnType>
  >,
) {
  return storiesOfFactory("Document Header", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: documentHeaderArgTypes,
      args: {
        featuresOpen: false,
        advancedSelectOpen: false,
        sticky: false,
      },
    });

    const template = templateMapper<DocumentHeaderArgs>((args, { documentHeaderTemplate, features }) =>
      documentHeaderTemplate(documentHeaderArgsMapper(args, features)),
    );

    stories.add("default", template, {
      args: {
        title: "Omgevingsplan gemeente Gouda",
        type: "Een omgevingsplan waar de omgeving mooier van wordt",
        owner: "Gemeente Gouda",
        advancedSelect: {
          options,
        },
      },
    });

    stories.add("sticky", template, {
      args: {
        title: "Omgevingsplan gemeente Gouda",
        type: "Een omgevingsplan waar de omgeving mooier van wordt",
        owner: "Gemeente Gouda",
        sticky: true,
        advancedSelect: {
          options,
        },
      },
    });

    return stories;
  });
}
