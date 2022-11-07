import { HandlerFunction } from "@storybook/addon-actions";

import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";
import { DefinitionList } from "../definition-list/definition-list.models";

import { DocumentHeaderArgs, documentHeaderArgsMapper, documentHeaderArgTypes } from "./document-header.args";
import { DocumentHeader } from "./document-header.models";

export interface DocumentHeaderTemplates<TemplateFnReturnType> {
  documentHeaderTemplate: (documentHeaderProperties: DocumentHeader<TemplateFnReturnType>) => TemplateFnReturnType;
  status: (documentHeaderFeatureOpen: boolean, documentHeaderFeatureAction: HandlerFunction) => TemplateFnReturnType;
  features: DefinitionList<TemplateFnReturnType>;
  statusContent: TemplateFnReturnType;
}

export function storiesOfDocumentHeader<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DocumentHeaderTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Document Header", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: documentHeaderArgTypes,
      args: {
        featuresOpen: false,
        statusContentOpen: false,
        sticky: false,
      },
    });

    const template = templateMapper<DocumentHeaderArgs>(
      (args, { documentHeaderTemplate, features, status, statusContent }) =>
        documentHeaderTemplate(
          documentHeaderArgsMapper(args, status(args.featuresOpen, args.featureAction), features, statusContent)
        )
    );

    stories.add("default", template, {
      args: {
        title: "Omgevingsplan gemeente Gouda",
        type: "Een omgevingsplan waar de omgeving mooier van wordt",
        owner: "Gemeente Gouda",
      },
    });

    stories.add("sticky", template, {
      args: {
        title: "Omgevingsplan gemeente Gouda",
        type: "Een omgevingsplan waar de omgeving mooier van wordt",
        owner: "Gemeente Gouda",
        sticky: true,
      },
    });
  });
}
