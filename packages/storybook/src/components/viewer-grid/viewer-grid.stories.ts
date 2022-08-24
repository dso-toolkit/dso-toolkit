import { AlertType, storiesOfViewerGrid } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";
import { html } from "lit-html";

import { alertTemplate } from "@dso-toolkit/core/src/components/alert/alert.template";

import { viewerGridTemplate } from "@dso-toolkit/core/src/components/viewer-grid/viewer-grid.template";

import readme from "@dso-toolkit/core/src/components/viewer-grid/readme.md";
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { tilesExampleTemplate } from './content/viewer-grid-tiles.content';
import { filterblokExampleTemplate } from './content/viewer-grid-filterblok.content';
import { documentHeaderExampleTemplate } from './content/viewer-grid-document-header.content';
import { documentListExampleTemplate } from './content/viewer-grid-document-list.content';

storiesOfViewerGrid(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core
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
    tilesExampleTemplate,
    filterblokExampleTemplate,
    documentHeaderExampleTemplate,
    documentListExampleTemplate
  }
);
