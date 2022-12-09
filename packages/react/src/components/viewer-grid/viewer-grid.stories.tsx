import * as React from "react";

import {
  storiesOfViewerGrid,
  AlertType,
  DocumentList,
  DocumentListItemStatusDemoContent,
  Tile,
  ViewerGridDocumentHeaderProperties,
} from "dso-toolkit";

import { activeFilters } from "dso-toolkit/dist/components/label-group/label-group.content";
import { HandlerFunction } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

import { DsoResponsiveElement } from "../../components";
import { templateContainer } from "../../templates";
import readme from "./readme.md";
import { definitionListTemplate } from "./viewer-grid.definition-list.content";
import { documentListTemplate } from "./viewer-grid.document-list.content";
import { contextTemplate } from "./viewer-grid.filterblok.content";

storiesOfViewerGrid({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ alertTemplate, badgeTemplate, iconTemplate, labelTemplate, viewerGridTemplate }) => {
    function documentHeaderExampleTemplate({
      documentHeaderFeaturesOpen,
      documentHeaderFeatureAction,
      documentHeaderStatusOpen,
      documentHeaderSticky,
    }: ViewerGridDocumentHeaderProperties) {
      function status(documentHeaderStatusOpen: boolean, documentHeaderFeatureAction: HandlerFunction) {
        return (
          <>
            {labelTemplate({
              status: "bright",
              label: "in werking",
            })}
            Gepubliceerd 03-03-2021
            <button
              type="button"
              className="dso-document-header-toggle-status"
              aria-expanded={documentHeaderStatusOpen}
              onClick={documentHeaderFeatureAction}
            >
              <span>overige versies</span>
              {iconTemplate({ icon: documentHeaderStatusOpen ? "chevron-up" : "chevron-down" })}
            </button>
            <span className="dso-document-header-badges">
              <span className="dso-badge badge-warning">
                <span aria-hidden="true">!</span>
                <span className="sr-only">Let op: ontwerpversie beschikbaar</span>
              </span>
              <span className="dso-badge badge-outline">
                <span aria-hidden="true">!</span>
                <span className="sr-only">Let op: toekomstige versie beschikbaar</span>
              </span>
            </span>
          </>
        );
      }

      return viewerGridTemplate({
        main: (
          <DsoResponsiveElement
            className={`dso-document-header ${documentHeaderSticky ? "dso-document-header-sticky" : ""}`}
          >
            <h1>
              <button type="button">
                <span>Omgevingsplan gemeente Gouda</span>
              </button>
            </h1>

            <div className="dso-document-header-container">
              <div className="dso-document-header-owner-wrapper">
                <p className="dso-document-header-type">Een omgevingsplan waar de omgeving mooier van wordt</p>
                <p className="dso-document-header-owner">Gemeente Gouda</p>
              </div>

              <button type="button" className="dso-document-header-map-action">
                <span className="sr-only">Actie</span>
                {iconTemplate({ icon: "map-location" })}
              </button>

              <div className="dso-document-header-features-wrapper">
                <button
                  type="button"
                  className="dso-document-header-toggle-features"
                  aria-expanded={!!documentHeaderFeaturesOpen}
                  onClick={documentHeaderFeatureAction as HandlerFunction}
                >
                  <span>{documentHeaderFeaturesOpen ? "Minder kenmerken" : "Meer kenmerken"}</span>
                  {iconTemplate({ icon: documentHeaderFeaturesOpen ? "chevron-up" : "chevron-down" })}
                </button>
                {definitionListTemplate({
                  modifier: "dso-document-header-features",
                  definitions: [
                    {
                      term: <>Opschrift:</>,
                      descriptions: [
                        {
                          content: (
                            <>Besluit van 3 juli 2018, houdende regels over activiteiten in de fysieke leefomgeving</>
                          ),
                        },
                      ],
                    },
                    {
                      term: <>Identificatie:</>,
                      descriptions: [
                        {
                          content: "/akn/nl/act/mnre1034/2021/BWBR0041330",
                        },
                      ],
                    },
                    {
                      term: <>Besluit:</>,
                      descriptions: [
                        {
                          content: <a href="#">Bekijk besluit {iconTemplate({ icon: "external-link" })}</a>,
                        },
                      ],
                    },
                  ],
                })}
              </div>

              <div className="dso-document-header-status-wrapper">
                <p className="dso-document-header-status">
                  {status(documentHeaderFeaturesOpen, documentHeaderFeatureAction)}
                </p>
                {documentHeaderStatusOpen && (
                  <div className="dso-document-header-status-content">
                    <h2>Versies</h2>
                    <h3>Vastgesteld</h3>
                    <div>
                      {iconTemplate({ icon: "eye" })}
                      <strong>Gepubliceerd op 01-03-2021</strong>
                      {labelTemplate({
                        label: "In werking",
                      })}
                    </div>
                    <div>
                      {iconTemplate({ icon: "chevron-right" })} Gepubliceerd op 10-03-2021
                      {labelTemplate({
                        status: "bright",
                        label: "Toekomstige versie",
                      })}
                      datum in werking: 1-6-2022
                    </div>
                    <a href="#">bekijk eerdere versies</a>
                    <h3>Ontwerpen binnen inzagetermijn</h3>
                    <div>
                      {iconTemplate({ icon: "chevron-right" })} Gepubliceerd op 09-02-2021
                      {labelTemplate({
                        status: "warning",
                        label: "Ontwerp",
                      })}
                      Eind inzagetermijn: 23-03-2022
                    </div>
                    <div>
                      {iconTemplate({ icon: "chevron-right" })} Gepubliceerd op 01-02-2021
                      {labelTemplate({
                        status: "warning",
                        label: "Ontwerp",
                      })}
                      Eind inzagetermijn: 15-03-2022
                    </div>
                    <div>
                      {iconTemplate({ icon: "chevron-right" })} Gepubliceerd op 20-01-2021
                      {labelTemplate({
                        status: "warning",
                        label: "Ontwerp",
                      })}
                      Eind inzagetermijn: 03-03-2022
                    </div>
                    <a href="#">bekijk ontwerpen waarvan inzagetermijn voorbij is</a>
                  </div>
                )}
              </div>
            </div>
          </DsoResponsiveElement>
        ),
        map: alertTemplate({ message: "Dit is de kaart", status: AlertType.Info }),
      });
    }

    function documentListExampleTemplate(documentList: DocumentList<DocumentListItemStatusDemoContent>) {
      return viewerGridTemplate({
        main: documentListTemplate({
          items: documentList.items.map((item) => ({
            ...item,
            status: (
              <>
                {badgeTemplate(item.status.badge)} {item.status.date}
              </>
            ),
          })),
        }),
        map: alertTemplate({ message: "Dit is de kaart", status: AlertType.Info }),
      });
    }

    function filterblokExampleTemplate() {
      return viewerGridTemplate({
        main: (
          <section className="dso-filterblok">
            <div className="dso-highlight-box">
              {contextTemplate({
                type: "label",
                label: <h3>Uw keuzes</h3>,
                content: <button className="dso-tertiary">{iconTemplate({ icon: "pencil" })} Alle Opties</button>,
                children: (
                  <>
                    <p className="dso-filterblok-address">Achterwillenseweg 9a, Gouda</p>
                    <div className="dso-label-group">
                      <ul>
                        {activeFilters.map((label) => (
                          <li>{labelTemplate(label)}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ),
              })}
            </div>
          </section>
        ),
        map: alertTemplate({ message: "Dit is de kaart", status: AlertType.Info }),
      });
    }

    function tilesExampleTemplate(tiles: Tile[]) {
      return viewerGridTemplate({
        main: (
          <>
            <h2>Thema's</h2>
            <p>Bekijk regels en beleid rond een bepaald thema.</p>
            <DsoResponsiveElement class="dso-tile-grid">
              {tiles.map((t) => (
                <>
                  <div className={`dso-tile ${t.variant === "theme" ? "dso-theme" : ""}`}>
                    <a href={t.anchor}>
                      <span className="dso-tile-icon">
                        <img
                          src={t.image.source}
                          className={t.image.modifier}
                          alt={t.image.alt}
                          width={t.image.width}
                          height={t.image.height}
                        />
                      </span>
                      <span className="dso-tile-link">{t.label}</span>
                    </a>
                  </div>
                </>
              ))}
            </DsoResponsiveElement>
          </>
        ),
        map: alertTemplate({ message: "Dit is de kaart", status: AlertType.Info }),
      });
    }

    return {
      viewerGridTemplate,
      example: {
        main: alertTemplate({
          status: AlertType.Info,
          message: (
            <p>
              Dit is <code>slot="main"</code>.
            </p>
          ),
        }),
        map: (
          <div className="alert alert-info">
            Dit is <code>slot="map"</code>.
          </div>
        ),
        filterpanel: (
          <div className="alert alert-info">
            Dit is <code>slot="filterpanel"</code>.
          </div>
        ),
        overlay: (
          <>
            <div className="alert alert-info">
              Dit is <code>slot="overlay"</code>
            </div>
            <div>
              <p>
                Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at felis quam. Nullam commodo ex
                ultrices, viverra urna a, pretium arcu. Nunc eget cursus lorem. Sed massa nunc, maximus sodales
                <a href="#">ultrices</a> nec, luctus et lectus. Interdum et malesuada fames ac ante ipsum primis in
                faucibus. Morbi ultrices tincidunt ipsum, sit amet ultricies nulla pulvinar nec. Cras sed tellus in nunc
                viverra aliquam. Aenean sed libero nulla. Curabitur placerat ullamcorper nisl, ut facilisis tortor
                rhoncus a. Etiam vel ex nec eros porttitor aliquam. Duis blandit vel ex at venenatis. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla sodales facilisis
                hendrerit.
              </p>

              <p>
                Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at felis quam. Nullam commodo ex
                ultrices, viverra urna a, pretium arcu. Nunc eget cursus lorem. Sed massa nunc, maximus sodales ultrices
                nec, luctus et lectus. Interdum et malesuada fames ac ante <a href="#">ipsum primis</a> in faucibus.
                Morbi ultrices tincidunt ipsum, sit amet ultricies nulla pulvinar nec. Cras sed tellus in nunc viverra
                aliquam. Aenean sed libero nulla. Curabitur placerat ullamcorper nisl, ut facilisis tortor rhoncus a.
                Etiam vel ex nec eros porttitor aliquam. Duis blandit vel ex at venenatis. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis egestas. Nulla sodales facilisis hendrerit.
              </p>
            </div>
          </>
        ),
      },
      tilesExampleTemplate,
      filterblokExampleTemplate,
      documentHeaderExampleTemplate,
      documentListExampleTemplate,
    };
  },
});
