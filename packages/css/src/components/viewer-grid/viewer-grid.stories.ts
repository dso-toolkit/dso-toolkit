import { storiesOfViewerGrid } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components'

import { viewerGridTemplate } from './viewer-grid.template';
import readme from './readme.md';
import { html } from 'lit-html';

storiesOfViewerGrid(
  {
    module,
    storiesOf,
    readme
  },
  {
    viewerGridDemoTemplate: ({ closeAside, expand, panelSize, panelOpen, shrink }) => viewerGridTemplate({
      closeAside,
      expand,
      panelOpen,
      panelSize,
      shrink,
      main: html`<h2>Main</h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean laoreet ligula vel cursus consequat. Aenean id dolor felis. Mauris eget ullamcorper neque. Donec finibus libero lorem, faucibus sollicitudin dui vehicula eu. Vestibulum libero lorem, rutrum ac blandit euismod, elementum vel diam. Nunc at convallis mi. Aliquam tincidunt ante eu quam molestie, nec rutrum quam accumsan. Pellentesque porta quis sem et dictum. Curabitur varius vel metus non pulvinar. Donec ut magna ut nunc lacinia vestibulum et eget enim. In efficitur felis non massa vulputate, eu pellentesque nisi sagittis. Nulla non magna eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque sodales nibh risus, ac dictum diam volutpat quis. Integer sed tortor quis libero iaculis interdum. Morbi vestibulum eu urna sed lacinia.`,
      map: html`<strong>MAP</strong>`,
      aside: html`<h2>Aside</h2>Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at felis quam. Nullam commodo ex ultrices, viverra urna a, pretium arcu. Nunc eget cursus lorem. Sed massa nunc, maximus sodales ultrices nec, luctus et lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi ultrices tincidunt ipsum, sit amet ultricies nulla pulvinar nec. Cras sed tellus in nunc viverra aliquam. Aenean sed libero nulla. Curabitur placerat ullamcorper nisl, ut facilisis tortor rhoncus a. Etiam vel ex nec eros porttitor aliquam. Duis blandit vel ex at venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla sodales facilisis hendrerit.`
    })
  }
);
