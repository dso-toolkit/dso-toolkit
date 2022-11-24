import {
  AlertType,
  DocumentList,
  DocumentListItemStatusDemoContent,
  storiesOfViewerGrid,
  Tile,
  ViewerGridDocumentHeaderProperties,
} from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";
import { html } from "lit-html";

import readme from "@dso-toolkit/core/src/components/viewer-grid/readme.md";
import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
import { templateContainer } from "../../templates";
import { HandlerFunction } from "@storybook/addon-actions";

import { activeFilters } from "@dso-toolkit/sources/src/components/label-group/label-group.content";

storiesOfViewerGrid({
  parameters: {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({
    anchorTemplate,
    iconTemplate,
    badgeTemplate,
    labelTemplate,
    viewerGridTemplate,
    alertTemplate,
    documentHeaderTemplate,
    documentListTemplate,
    labelGroupTemplate,
    contextTemplate,
    buttonTemplate,
    tileGridTemplate,
  }) => {
    function documentHeaderExampleTemplate({
      documentHeaderFeaturesOpen,
      documentHeaderFeatureAction,
      documentHeaderStatusOpen,
      documentHeaderSticky,
    }: ViewerGridDocumentHeaderProperties) {
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

      return viewerGridTemplate({
        main: documentHeaderTemplate({
          title: "Omgevingsplan gemeente Gouda",
          type: "Een omgevingsplan waar de omgeving mooier van wordt",
          owner: "Gemeente Gouda",
          features: {
            modifier: "dso-document-header-features",
            definitions: [
              {
                term: html`Opschrift:`,
                descriptions: [
                  {
                    content: "Besluit van 3 juli 2018, houdende regels over activiteiten in de fysieke leefomgeving",
                  },
                ],
              },
              {
                term: html`Identificatie:`,
                descriptions: [
                  {
                    content: "/akn/nl/act/mnre1034/2021/BWBR0041330",
                  },
                ],
              },
              {
                term: html`Besluit:`,
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
          },
          featureAction: documentHeaderFeatureAction,
          featuresOpen: documentHeaderFeaturesOpen,
          statusContentOpen: documentHeaderStatusOpen,
          sticky: documentHeaderSticky,
          status: status(documentHeaderFeaturesOpen, documentHeaderFeatureAction),
          statusContent: html`
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
          `,
        }),
        map: alertTemplate({ message: "Dit is de kaart", status: AlertType.Info }),
      });
    }

    function documentListExampleTemplate(documentList: DocumentList<DocumentListItemStatusDemoContent>) {
      return viewerGridTemplate({
        main: documentListTemplate({
          items: documentList.items.map((item) => ({
            ...item,
            status: html`${badgeTemplate(item.status.badge)} ${item.status.date}`,
          })),
        }),
        map: alertTemplate({ message: "Dit is de kaart", status: AlertType.Info }),
      });
    }

    function filterblokExampleTemplate() {
      return viewerGridTemplate({
        main: html`
          <section class="dso-filterblok">
            <div class="dso-highlight-box">
              ${contextTemplate({
                type: "label",
                label: html`<h3>Uw keuzes</h3>`,
                content: buttonTemplate({
                  variant: "tertiary",
                  label: "Alle opties",
                  icon: {
                    icon: "pencil",
                  },
                }),
                children: html`
                  <p class="dso-filterblok-address">Achterwillenseweg 9a, Gouda</p>
                  ${labelGroupTemplate({ labels: activeFilters })}
                `,
              })}
            </div>
          </section>
        `,
        map: alertTemplate({ message: "Dit is de kaart", status: AlertType.Info }),
      });
    }

    function tilesExampleTemplate(tiles: Tile[]) {
      return viewerGridTemplate({
        main: html`
          <h2>Thema's</h2>
          <p>Bekijk regels en beleid rond een bepaald thema.</p>
          ${tileGridTemplate({ tiles })}
        `,
        map: alertTemplate({ message: "Dit is de kaart", status: AlertType.Info }),
      });
    }

    return {
      viewerGridTemplate,
      example: {
        main: alertTemplate({ status: AlertType.Info, message: html`<p>Dit is <code>slot="main"</code>.</p>` }),
        map: html`<div class="alert alert-info">Dit is <code>slot="map"</code>.</div>`,
        filterpanel: html`<div class="alert alert-info">Dit is <code>slot="filterpanel"</code>.</div>`,
        overlay: html`<div class="alert alert-info">Dit is <code>slot="overlay"</code></div>
          <div>
            <p>
              Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at felis quam. Nullam commodo ex
              ultrices, viverra urna a, pretium arcu. Nunc eget cursus lorem. Sed massa nunc, maximus sodales
              ${anchorTemplate({ label: "ultrices", url: "#" })} nec, luctus et lectus. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Morbi ultrices tincidunt ipsum, sit amet ultricies nulla pulvinar nec. Cras
              sed tellus in nunc viverra aliquam. Aenean sed libero nulla. Curabitur placerat ullamcorper nisl, ut
              facilisis tortor rhoncus a. Etiam vel ex nec eros porttitor aliquam. Duis blandit vel ex at venenatis.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla
              sodales facilisis hendrerit.
            </p>

            <p>
              Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at felis quam. Nullam commodo ex
              ultrices, viverra urna a, pretium arcu. Nunc eget cursus lorem. Sed massa nunc, maximus sodales ultrices
              nec, luctus et lectus. Interdum et malesuada fames ac ante
              ${anchorTemplate({ label: "ipsum primis", url: "#" })} in faucibus. Morbi ultrices tincidunt ipsum, sit
              amet ultricies nulla pulvinar nec. Cras sed tellus in nunc viverra aliquam. Aenean sed libero nulla.
              Curabitur placerat ullamcorper nisl, ut facilisis tortor rhoncus a. Etiam vel ex nec eros porttitor
              aliquam. Duis blandit vel ex at venenatis. Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Nulla sodales facilisis hendrerit.
            </p>
          </div>`,
      },
      tilesExampleTemplate,
      filterblokExampleTemplate,
      documentHeaderExampleTemplate,
      documentListExampleTemplate,
    };
  },
});
