import { HandlerFunction } from "@storybook/addon-actions";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import {
  documentComponentMapper,
  documentComponentArgTypes,
  documentComponentArgs,
  DocumentComponentArgs,
} from "./document-component.args.js";

import { DocumentComponent } from "./document-component.models.js";
import { imroContent } from "./document-component.content.js";

export interface DocumentComponentTemplates<TemplateFnReturnType> {
  documentComponentTemplate: (
    documentComponentProperties: DocumentComponent<TemplateFnReturnType>
  ) => TemplateFnReturnType;
  demoTemplate: (
    jsonFile: string,
    openDefault: boolean,
    showCanvas: boolean,
    ozonContentAnchorClick: HandlerFunction
  ) => TemplateFnReturnType;
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
    stories.add(
      "default",
      templateMapper<DocumentComponentArgs>((args, { documentComponentTemplate }) =>
        documentComponentTemplate(documentComponentMapper(args))
      ),
      {
        args: documentComponentArgs,
        argTypes: documentComponentArgTypes,
      }
    );

    stories.add(
      "Demo",
      templateMapper<{
        jsonFile: string;
        openDefault: boolean;
        showCanvas: boolean;
        ozonContentAnchorClick: HandlerFunction;
      }>((args, { demoTemplate }) =>
        demoTemplate(args.jsonFile, args.openDefault, args.showCanvas, args.ozonContentAnchorClick)
      ),
      {
        args: {
          jsonFile: "ozon-response-bal.json",
          openDefault: true,
          showCanvas: false,
        },
        argTypes: {
          jsonFile: {
            options: ["ozon-response.json", "ozon-response-bal.json", "ozon-response-waterschappen.json"],
            control: {
              type: "select",
            },
          },
          openDefault: {
            control: {
              type: "boolean",
            },
          },
          showCanvas: {
            control: {
              type: "boolean",
            },
          },
          ozonContentAnchorClick: {
            action: "dsoOzonContentAnchorClick",
          },
        },
        layout: "fullscreen",
      }
    );

    stories.add(
      "IMRO",
      templateMapper<DocumentComponentArgs>((args, { documentComponentTemplate }) =>
        documentComponentTemplate(documentComponentMapper(args))
      ),
      {
        argTypes: documentComponentArgTypes,
        args: {
          ...documentComponentArgs,
          label: undefined,
          nummer: undefined,
          opschrift: undefined,
          wijzigactie: undefined,
          inhoud: undefined,
          type: undefined,
          vervallen: undefined,
          notApplicable: undefined,
          gereserveerd: undefined,
          genesteOntwerpInformatie: undefined,
          filtered: undefined,
          bevatOntwerpInformatie: undefined,
          annotated: undefined,
          open: true,
          alternativeTitle: "Adequaat aanbod openbaar vervoer",
          content: imroContent,
        },
      }
    );

    return stories;
  });
}
