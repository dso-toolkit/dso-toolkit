import { DocumentComponentOzonContentAnchorClickEvent, DsotDocumentComponentDemoCustomEvent } from "@dso-toolkit/core";
import readme from "@dso-toolkit/core/src/components/document-component/readme.md?raw";
import { Meta } from "@storybook/web-components";
import {
  DocumentComponentTableOfContentsClickEvent,
  documentComponentMeta,
  documentComponentStories,
} from "dso-toolkit";
import { html } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { templateContainer } from "../../templates";

import { decorator } from "./document-component.decorator";

const meta: Meta = {
  ...documentComponentMeta({ readme }),
  title: "Core/Document Component",
};

export default meta;

const { Default, Contents, Inhoudsopgave, IMRO } = documentComponentStories(
  {
    templateContainer,
    storyTemplates: (templates) => {
      const { documentComponentTemplate, annotationTemplate, definitionListTemplate } = templates;

      return {
        documentComponentTemplate,
        imroTemplate: (imroContent) => html`${unsafeHTML(imroContent)}`,
        childrenTemplate: html`<div slot="annotations">
          ${definitionListTemplate({
            definitions: [
              {
                term: html`Type regel`,
                descriptions: [
                  {
                    content: html`<dso-renvooi value="Regel voor iedereen"></dso-renvooi>`,
                  },
                ],
              },
            ],
          })}
          <hr />
          ${annotationTemplate({ type: "locatie", locatieNoemer: "Locatie 1", symboolCode: "vag000" })}
          ${annotationTemplate({
            type: "locatie",
            locatieNoemer: "locatieNoemer",
            symboolCode: "vszt030",
            gewijzigdeLocatie: true,
          })}
          ${annotationTemplate({ type: "locatie", locatieNoemer: "Locatie 3", symboolCode: "vag000" })}
          ${annotationTemplate({ type: "locatie", locatieNoemer: "Locatie 4", symboolCode: "vszt030" })}
          <hr />
          ${annotationTemplate({ type: "gebiedsaanwijzing", naam: "Beschermingszone dijk", symboolCode: "vag000" })}
          ${annotationTemplate({ type: "gebiedsaanwijzing", naam: "Opwekking energie", symboolCode: "vszt030" })}
          ${annotationTemplate({ type: "gebiedsaanwijzing", naam: "Opwekking windenergie", symboolCode: "vag000" })}
        </div>`,
        demoTemplate: (
          jsonFile,
          openDefault,
          showCanvas,
          mode,
          ozonContentAnchorClick,
          tableOfContentsClick,
          ozonContentUrlResolver,
        ) =>
          html`<dsot-document-component-demo
            @dsotOzonContentAnchorClick=${(
              e: DsotDocumentComponentDemoCustomEvent<DocumentComponentOzonContentAnchorClickEvent>,
            ) => ozonContentAnchorClick(e.detail)}
            .jsonFile=${jsonFile}
            ?open-default=${openDefault}
            ?show-canvas=${showCanvas}
            .mode=${mode}
            .ozonContentUrlResolver=${ozonContentUrlResolver}
            @dsotTableOfContentsClick=${(
              e: DsotDocumentComponentDemoCustomEvent<DocumentComponentTableOfContentsClickEvent>,
            ) => {
              if (!e.detail.isModifiedEvent) {
                e.detail.originalEvent.preventDefault();
              }
              tableOfContentsClick(e);
            }}
          ></dsot-document-component-demo>`,
      };
    },
  },
  decorator,
);

export { Contents, Default, IMRO, Inhoudsopgave };
