import { AlertType, storiesOfViewerGrid } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";
import { html } from "lit-html";

import { alertTemplate } from "../alert/alert.template";

import { viewerGridTemplate } from "./templates/viewer-grid.template";
import { viewerGridTilesExampleTemplate } from "./example-pages/viewer-grid-tiles.example-template";
import { viewerGridFilterblokExampleTemplate } from "./example-pages/viewer-grid-filterblok.example-template";
import { viewerGridDocumentHeaderExampleTemplate } from "./example-pages/viewer-grid-document-header.example-template";
import { viewerGridDocumentItemExampleTemplate } from "./example-pages/viewer-grid-document-item.example-template";

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
      overlay: html`<div class="alert alert-info">Dit is <code>slot="overlay"</code></div><div>En dit is een <a href="#">meer</a> link. En nog een <a href="#">link</a><a href="#">voor test</a></div>`
    },
    tilesExampleTemplate: viewerGridTilesExampleTemplate,
    filterblokExampleTemplate: viewerGridFilterblokExampleTemplate,
    documentHeaderExampleTemplate: viewerGridDocumentHeaderExampleTemplate,
    documentItemExampleTemplate: viewerGridDocumentItemExampleTemplate
  }
);
