import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import {
  documentComponentMapper,
  documentComponentArgTypes,
  documentComponentArgs,
  DocumentComponentArgs,
} from "./document-component.args.js";

import { DocumentComponent } from "./document-component.models.js";

export interface DocumentComponentTemplates<TemplateFnReturnType> {
  documentComponentTemplate: (
    documentComponentProperties: DocumentComponent<TemplateFnReturnType>
  ) => TemplateFnReturnType;
  demo: TemplateFnReturnType;
}

export function storiesOfDocumentComponent<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DocumentComponentTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Document Component", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      args: documentComponentArgs,
      argTypes: documentComponentArgTypes,
    });

    stories.add(
      "default",
      templateMapper<DocumentComponentArgs>((args, { documentComponentTemplate }) =>
        documentComponentTemplate(documentComponentMapper(args))
      )
    );

    stories.add(
      "Demo",
      templateMapper<DocumentComponentArgs>((_args, { demo }) => demo),
      {
        layout: "fullscreen",
      }
    );

    return stories;
  });
}
