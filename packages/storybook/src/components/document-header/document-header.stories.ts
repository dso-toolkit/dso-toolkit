import { DefinitionList, storiesOfDocumentHeader } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "@dso-toolkit/css/src/components/document-header/readme.md";

import { StoryRoot } from "@dso-toolkit/sources/src/storybook";

import { templateContainer } from "../../templates";
import { html, TemplateResult } from "lit-html";
import { HandlerFunction } from "@storybook/addon-actions";

storiesOfDocumentHeader({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ documentHeaderTemplate, anchorTemplate, labelTemplate, buttonTemplate, iconTemplate }) => {
    const features: DefinitionList<TemplateResult> = {
      modifier: "dso-document-header-features",
      definitions: [
        {
          term: "Opschrift",
          descriptions: [
            {
              content: "Besluit van 3 juli 2018, houdende regels over activiteiten in de fysieke leefomgeving",
            },
          ],
        },
        {
          term: "Identificatie",
          descriptions: [
            {
              content: "/akn/nl/act/mnre1034/2021/BWBR0041330",
            },
          ],
        },
        {
          term: "Besluit",
          descriptions: [
            {
              content: anchorTemplate({
                label: "Bekijk besluit",
                url: "#",
                icon: {
                  icon: "external-link",
                },
                iconMode: "after",
              }),
            },
          ],
        },
      ],
      useSrOnlyColon: false,
    };

    function status(documentHeaderStatusOpen: boolean, documentHeaderFeatureAction: HandlerFunction) {
      return html`
        ${labelTemplate({
          status: "bright",
          label: "in werking",
        })}
        Gepubliceerd 03-03-2021
        ${buttonTemplate({
          ariaExpanded: documentHeaderStatusOpen,
          onClick: documentHeaderFeatureAction,
          label: "overige versies",
          variant: null,
          modifier: "dso-document-header-toggle-status",
          icon: {
            icon: documentHeaderStatusOpen ? "chevron-up" : "chevron-down",
          },
          iconMode: "after",
        })}
        <span class="dso-document-header-badges">
          <span class="dso-badge badge-warning">
            <span aria-hidden="true">!</span>
            <span class="sr-only">Let op: ontwerpversie beschikbaar</span>
          </span>
          <span class="dso-badge badge-outline">
            <span aria-hidden="true">!</span>
            <span class="sr-only">Let op: toekomstige versie beschikbaar</span>
          </span>
        </span>
      `;
    }

    const statusContent = html`
      <h2>Versies</h2>
      <h3>Vastgesteld</h3>
      <div>
        ${iconTemplate({ icon: "eye" })}
        <strong>Gepubliceerd op 01-03-2021</strong>
        ${labelTemplate({
          label: "In werking",
        })}
      </div>
      <div>
        ${iconTemplate({ icon: "chevron-right" })} Gepubliceerd op 10-03-2021
        ${labelTemplate({
          status: "bright",
          label: "Toekomstige versie",
        })}
        datum in werking: 1-6-2022
      </div>
      ${anchorTemplate({ label: "bekijk eerdere versies", url: "#" })}

      <h3>Ontwerpen binnen inzagetermijn</h3>
      <div>
        ${iconTemplate({ icon: "chevron-right" })} Gepubliceerd op 09-02-2021
        ${labelTemplate({
          status: "warning",
          label: "Ontwerp",
        })}
        Eind inzagetermijn: 23-03-2022
      </div>
      <div>
        ${iconTemplate({ icon: "chevron-right" })} Gepubliceerd op 01-02-2021
        ${labelTemplate({
          status: "warning",
          label: "Ontwerp",
        })}
        Eind inzagetermijn: 15-03-2022
      </div>
      <div>
        ${iconTemplate({ icon: "chevron-right" })} Gepubliceerd op 20-01-2021
        ${labelTemplate({
          status: "warning",
          label: "Ontwerp",
        })}
        Eind inzagetermijn: 03-03-2022
      </div>
      ${anchorTemplate({ label: "bekijk ontwerpen waarvan inzagetermijn voorbij is", url: "#" })}
    `;

    return { documentHeaderTemplate, features, status, statusContent };
  },
});
