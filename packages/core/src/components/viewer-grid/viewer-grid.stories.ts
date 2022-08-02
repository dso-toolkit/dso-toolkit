import { AlertType, storiesOfViewerGrid } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";
import { html } from "lit-html";

import { alertTemplate } from "../alert/alert.template";

import { viewerGridTemplate } from "./templates/viewer-grid.template";
import { viewerGridTilesExampleTemplate } from "./example-pages/viewer-grid-tiles.example-template";
import { viewerGridFilterblokExampleTemplate } from "./example-pages/viewer-grid-filterblok.example-template";
import { viewerGridDocumentHeaderExampleTemplate } from "./example-pages/viewer-grid-document-header.example-template";
import { viewerGridDocumentListExampleTemplate } from "./example-pages/viewer-grid-document-list.example-template";

import readme from "./readme.md";

storiesOfViewerGrid(
  {
    module,
    storiesOf,
    readme,
  },
  {
    viewerGridTemplate,
    example: {
      main: alertTemplate({ status: AlertType.Info, message: html`<p>Dit is <code>slot="main"</code>.</p>`}),
      map: html`<div class="alert alert-info">Dit is <code>slot="map"</code>.</div>`,
      filterpanel: html`<div class="alert alert-info">Dit is <code>slot="filterpanel"</code>.</div>`,
      overlay: html`<div class="alert alert-info">Dit is <code>slot="overlay"</code></div>
      <div><p>Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at felis quam. Nullam commodo ex ultrices, viverra urna a, pretium arcu. Nunc eget cursus lorem. Sed massa nunc, maximus sodales <a href="#">ultrices</a> nec, luctus et lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi ultrices tincidunt ipsum, sit amet ultricies nulla pulvinar nec. Cras sed tellus in nunc viverra aliquam. Aenean sed libero nulla. Curabitur placerat ullamcorper nisl, ut facilisis tortor rhoncus a. Etiam vel ex nec eros porttitor aliquam. Duis blandit vel ex at venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla sodales facilisis hendrerit.</p>

      <p>Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at felis quam. Nullam commodo ex ultrices, viverra urna a, pretium arcu. Nunc eget cursus lorem. Sed massa nunc, maximus sodales ultrices nec, luctus et lectus. Interdum et malesuada fames ac ante <a href="#">ipsum primis</a> in faucibus. Morbi ultrices tincidunt ipsum, sit amet ultricies nulla pulvinar nec. Cras sed tellus in nunc viverra aliquam. Aenean sed libero nulla. Curabitur placerat ullamcorper nisl, ut facilisis tortor rhoncus a. Etiam vel ex nec eros porttitor aliquam. Duis blandit vel ex at venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla sodales facilisis hendrerit.</p></div>`
    },
    tilesExampleTemplate: viewerGridTilesExampleTemplate,
    filterblokExampleTemplate: viewerGridFilterblokExampleTemplate,
    documentHeaderExampleTemplate: viewerGridDocumentHeaderExampleTemplate,
    documentListExampleTemplate: viewerGridDocumentListExampleTemplate
  }
);
