import { storiesOfViewerGrid, Tile } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";
import { html } from "lit-html";

import { tileGridTemplate } from '@dso-toolkit/css/src/components/tile-grid/tile-grid.template';
import { tileTemplate } from '@dso-toolkit/css/src/components/tile/tile.template';

import { anchorTemplate } from "../anchor/anchor.template";
import { badgeTemplate } from "../badge/badge.template";
import { buttonTemplate } from "../button/button.template";
import { imageOverlayTemplate } from '../image-overlay/image-overlay.template';
import { iconTemplate } from "../icon/icon.template";

import readme from "./readme.md";
import { viewerGridDocumentHeaderTemplate } from "./viewer-grid-document-header.template";
import { viewerGridDocumentListItem } from "./viewer-grid-document-list-item.template";
import { viewerGridFilterblok } from "./viewer-grid-filterblok.template";
import { viewerGridTemplate } from "./viewer-grid.template";

function viewerGridWithSearchResultsDemoTemplate(
  filterblokAllOptions: (e: MouseEvent) => void,
  filterblokDeleteActiveFilter: (e: MouseEvent) => void,
  documentHeaderFeatureAction: (e: MouseEvent) => void,
  documentHeaderMapAction: (e: MouseEvent) => void,
  documentHeaderFeaturesOpen: boolean,
  documentHeaderStatusOpen: boolean,
) {
  return html`
    ${viewerGridFilterblok({
      onAllOptions: filterblokAllOptions,
      title: html`<h3>Uw keuzes</h3>`,
      address: "Achterwillenseweg 9a, Gouda",
      activeFilters: [
        {
          label: "Geldend",
          status: "bright",
          button: {
            icon: "times",
            onClick: filterblokDeleteActiveFilter,
            title: "Verwijder",
          },
        },
        {
          label: "Regels",
          status: "bright",
        },
        {
          label: "Tuin",
          status: "bright",
        },
        {
          label: "Woongebied",
          status: "bright",
        },
        {
          label: "Geluidzone",
          status: "bright",
        },
        {
          label: "Thema: milieu algemeen",
          status: "bright",
        },
      ],
    })}
    ${viewerGridDocumentHeaderTemplate({
      title: html`<h1>Omgevingsplan gemeente Gouda</h1>`,
      type: "Een omgevingsplan waar de omgeving mooier van wordt",
      owner: "Gemeente Gouda",
      status: html`<strong>Versie:</strong>
        ${buttonTemplate({
            ariaExpanded: documentHeaderStatusOpen,
            onClick: documentHeaderFeatureAction,
            label: "in werking 01-03-2021",
            variant: null,
            modifier: "dso-document-header-toggle-status",
            icon: {
              icon: documentHeaderStatusOpen ? "angle-up" : "angle-down",
            },
            iconMode: "after",
          })}
        ${badgeTemplate({
          status: "warning",
          message: "3 ontwerp",
        })}
        ${badgeTemplate({
          status: "outline",
          message: "1 toekomstig",
        })}`,
      statusContent: html`
        <div class="dso-document-header-status-content">
          <h2>Versies</h2>

          <h3>Vastgesteld</h3>
          <div class="dso-document-header-status-item">
            ${iconTemplate({ icon: 'eye' })}
            <strong>Gepubliceerd op 01-03-2021</strong>
            ${badgeTemplate({
              message: "In werking",
            })}
          </div>
          <div class="dso-document-header-status-item">
            ${iconTemplate({ icon: 'chevron-right' })}
            Gepubliceerd op 10-03-2021
            ${badgeTemplate({
              status: "outline",
              message: "Toekomstige versie",
            })}
          </div>
          ${anchorTemplate({ label: 'bekijk oudere versies', url: '#' })}

          <h3>Ontwerpen binnen inzagetermijn</h3>
          <div class="dso-document-header-status-item">
            ${iconTemplate({ icon: 'chevron-right' })}
            Gepubliceerd op 09-02-2021
            ${badgeTemplate({
              status: "warning",
              message: "Ontwerp",
            })}
            Eind inzagetermijn 23-03-2022
          </div>
          <div class="dso-document-header-status-item">
            ${iconTemplate({ icon: 'chevron-right' })}
            Gepubliceerd op 01-02-2021
            ${badgeTemplate({
              status: "warning",
              message: "Ontwerp",
            })}
            Eind inzagetermijn 15-03-2022
          </div>
          <div class="dso-document-header-status-item">
            ${iconTemplate({ icon: 'chevron-right' })}
            Gepubliceerd op 20-01-2021
            ${badgeTemplate({
              status: "warning",
              message: "Ontwerp",
            })}
            Eind inzagetermijn 03-03-2022
          </div>
          ${anchorTemplate({ label: 'bekijk ontwerpen waarvan inzagetermijn voorbij is', url: '#' })}

        </div>
      `,
      featuresAction: documentHeaderFeatureAction,
      featuresOpen: documentHeaderFeaturesOpen,
      statusOpen: documentHeaderStatusOpen,
      mapAction: documentHeaderMapAction,
      features: {
        modifier: "dso-document-header-features",
        definitions: [
          {
            term: "Opschrift",
            descriptions: [
              {
                content: "Besluit van 3 juli 2018, houdende regels over activiteiten in de fysieke leefomgeving"
              },
            ],
          },
          {
            term: "Identificatie",
            descriptions: [
              {
                content: "/akn/nl/act/mnre1034/2021/BWBR0041330"
              }
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
                })
              }
            ],
          },
        ],
        useSrOnlyColon: false,
      },
    })}
    <div class="dso-rich-content">
      <h2>Main</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean laoreet
        ligula vel cursus consequat. Aenean id dolor felis. Mauris eget
        ullamcorper neque. Donec finibus libero lorem, faucibus sollicitudin dui
        vehicula eu. Vestibulum libero lorem, rutrum ac blandit euismod,
        elementum vel diam. Nunc at convallis mi. Aliquam tincidunt ante eu quam
        molestie, nec rutrum quam accumsan. Pellentesque porta quis sem et
        dictum. Curabitur varius vel metus non pulvinar. Donec ut magna ut nunc
        lacinia vestibulum et eget enim. In efficitur felis non massa vulputate,
        eu pellentesque nisi sagittis. Nulla non magna eros. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        Quisque sodales nibh risus, ac dictum diam volutpat quis. Integer sed
        tortor quis libero iaculis interdum.
      </p>
      ${imageOverlayTemplate({ image: { source: 'images/canvas-home_iplo-min.png', alt: 'Kanaal met windmolens' } })}
    </div>
    <ul class="dso-document-list">
      <li>
        ${viewerGridDocumentListItem({
          title: html`<h2>Omgevingsplan gemeente Gouda</h2>`,
          type: "Omgevingsplan",
          owner: "Gemeente Gouda",
          status: html`${badgeTemplate({
            status: "warning",
            message: "Ontwerp",
          })}Bekendgemaakt
          01-03-2021`,
        })}
      </li>
      <li>
        ${viewerGridDocumentListItem({
          title: html`<h2>Omgevingsplan gemeente Gooise Meren</h2>`,
          type: "Omgevingsplan",
          owner: "Gemeente Gooise Meren",
          status: html`${badgeTemplate({
            status: "warning",
            message: "Ontwerp",
          })}In
          werking vanaf 01-10-2022`,
        })}
      </li>
    </ul>
  `;
}

function viewerGridWithTilesDemoTemplate(tiles: Tile[]) {
  return html`
    <h2>Thema's</h2>
    <p>Bekijk regels en beleid rond een bepaald thema.</p>
    ${tileGridTemplate({ children: html`${tiles.map(tile => tileTemplate(tile))}` })}
  `;
}

const filterpanel = html`
  <hr>
  <dso-alert status="info">
    Dit is het "Filterpaneel"
  </dso-alert>
  <dso-highlight-box yellow>
    <div class="dso-rich-content">
      <p>Dit is een stukje tekst om voor wat vulling te zorgen.</p>
    </div>
  </dso-highlight-box>
  <div class="dso-rich-content">
    <ol>
      <li>Een</li>
      <li>Twee</li>
      <li>Drie</li>
    </ol>
    <p>
      Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at
      felis quam. Nullam commodo ex ultrices, viverra urna a, pretium arcu. Nunc
      eget cursus lorem. Sed massa nunc, maximus sodales ultrices nec, luctus et
      lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Morbi ultrices tincidunt ipsum, sit amet ultricies nulla pulvinar nec.
      Cras sed tellus in nunc viverra aliquam. Aenean sed libero nulla.
      Curabitur placerat ullamcorper nisl, ut facilisis tortor rhoncus a. Etiam
      vel ex nec eros porttitor aliquam. Duis blandit vel ex at venenatis.
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Nulla sodales facilisis hendrerit.
    </p>
    <p>
      Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at
      felis quam. Nullam commodo ex ultrices, viverra urna a, pretium arcu. Nunc
      eget cursus lorem. Sed massa nunc, maximus sodales ultrices nec, luctus et
      lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Morbi ultrices tincidunt ipsum, sit amet ultricies nulla pulvinar nec.
      Cras sed tellus in nunc viverra aliquam. Aenean sed libero nulla.
      Curabitur placerat ullamcorper nisl, ut facilisis tortor rhoncus a. Etiam
      vel ex nec eros porttitor aliquam. Duis blandit vel ex at venenatis.
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Nulla sodales facilisis hendrerit.
    </p>
  </div>
  <hr>
`;

const map = html`
  <div class="alert alert-success">
    Hier komt de kaart. Dit paneel heeft maximale breedte/hoogte en
    <code>overflow: hidden;</code>
  </div>
`;

const overlay = html`
  <div class="dso-rich-content">
    <h2>Overlay</h2>
    <p>Deze overlay valt over de andere panelen heen.</p>
    <div class="alert alert-info">Dit is een overlay</div>
    <p>
      Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at
      felis quam. Nullam commodo ex <a href="#">ultrices</a>, viverra urna a,
      pretium arcu. Nunc eget cursus lorem. Sed massa nunc, maximus sodales
      ultrices nec, luctus et lectus. Interdum et malesuada fames ac ante ipsum
      primis in faucibus. Morbi ultrices tincidunt ipsum, sit amet ultricies
      nulla pulvinar nec. Cras sed tellus in nunc viverra aliquam. Aenean sed
      libero nulla. Curabitur placerat ullamcorper nisl, ut facilisis tortor
      rhoncus a. Etiam vel ex nec eros porttitor aliquam. Duis blandit vel ex at
      venenatis. Pellentesque habitant morbi tristique senectus et netus et
      malesuada fames ac turpis egestas. Nulla sodales facilisis hendrerit.
    </p>
    <p>
      Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at
      felis quam. Nullam commodo ex ultrices, viverra urna a, pretium arcu. Nunc
      eget cursus lorem. Sed massa nunc, maximus sodales ultrices nec, luctus et
      lectus. Interdum et malesuada fames ac ante
      <a href="#">ipsum primis</a> in faucibus. Morbi ultrices tincidunt ipsum,
      sit amet ultricies nulla pulvinar nec. Cras sed tellus in nunc viverra
      aliquam. Aenean sed libero nulla. Curabitur placerat ullamcorper nisl, ut
      facilisis tortor rhoncus a. Etiam vel ex nec eros porttitor aliquam. Duis
      blandit vel ex at venenatis. Pellentesque habitant morbi tristique
      senectus et netus et malesuada fames ac turpis egestas. Nulla sodales
      facilisis hendrerit.
    </p>
    ${imageOverlayTemplate({ image: { source: 'images/canvas-home_iplo-min.png', alt: 'Kanaal met windmolens' } })}
    <p>
      Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at
      felis quam. Nullam commodo ex ultrices, viverra urna a, pretium arcu. Nunc
      eget cursus lorem. Sed massa nunc, maximus sodales ultrices nec, luctus et
      lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Morbi ultrices tincidunt ipsum, sit amet ultricies nulla pulvinar nec.
      Cras sed tellus in nunc viverra aliquam. Aenean sed libero nulla.
      Curabitur placerat ullamcorper nisl, ut facilisis tortor rhoncus a. Etiam
      vel ex nec eros porttitor aliquam. Duis blandit vel ex at venenatis.
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Nulla sodales facilisis hendrerit.
    </p>
    <p>
      Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at
      felis quam. Nullam commodo ex ultrices, viverra urna a, pretium arcu. Nunc
      eget cursus lorem. Sed massa nunc, maximus sodales ultrices nec, luctus et
      lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Morbi ultrices tincidunt ipsum, sit amet ultricies nulla pulvinar nec.
      Cras sed tellus in nunc viverra aliquam. Aenean sed libero nulla.
      Curabitur placerat ullamcorper nisl, ut facilisis tortor rhoncus a. Etiam
      vel ex nec eros porttitor aliquam. Duis blandit vel ex at venenatis.
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Nulla sodales facilisis hendrerit.
    </p>
  </div>
`;

storiesOfViewerGrid(
  {
    module,
    storiesOf,
    readme,
  },
  {
    viewerGridWithSearchResultsDemoTemplate: ({
      closeOverlay,
      filterpanelOpen,
      overlayOpen,
      noOverlay,
      filterpanelApply,
      initialMainSize,
      mainSizeChange,
      filterpanelCancel,
      filterblokDeleteActiveFilter,
      allOptions,
      documentHeaderFeatureAction,
      documentHeaderFeaturesOpen,
      documentHeaderMapAction,
      documentHeaderStatusOpen,
    }) =>
      viewerGridTemplate({
        closeOverlay,
        filterpanelOpen,
        initialMainSize,
        mainSizeChange,
        filterpanel,
        overlayOpen,
        filterpanelApply,
        filterpanelCancel,
        noOverlay,
        main: viewerGridWithSearchResultsDemoTemplate(
          allOptions,
          filterblokDeleteActiveFilter,
          documentHeaderFeatureAction,
          documentHeaderMapAction,
          documentHeaderFeaturesOpen,
          documentHeaderStatusOpen
        ),
        map,
        overlay
      }),
    viewerGridWithTilesDemoTemplate: ({
      closeOverlay,
      tiles,
      filterpanelOpen,
      overlayOpen,
      initialMainSize,
      mainSizeChange,
      noOverlay,
      filterpanelApply,
      filterpanelCancel,
    }) =>
      viewerGridTemplate({
        closeOverlay,
        filterpanelOpen,
        filterpanel,
        initialMainSize,
        mainSizeChange,
        filterpanelApply,
        filterpanelCancel,
        overlayOpen,
        noOverlay,
        main: viewerGridWithTilesDemoTemplate(tiles),
        map,
        overlay
      }),
  }
);
