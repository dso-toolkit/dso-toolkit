import { storiesOfViewerGrid } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components'
import { html } from 'lit-html';

import { viewerGridTemplate } from './viewer-grid.template';
import readme from './readme.md';

const main = html`
  <div class="dso-rich-content">
    <h2>Main</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean laoreet ligula vel cursus consequat. Aenean id dolor
      felis. Mauris eget ullamcorper neque. Donec finibus libero lorem, faucibus sollicitudin dui vehicula eu. Vestibulum
      libero lorem, rutrum ac blandit euismod, elementum vel diam. Nunc at convallis mi. Aliquam tincidunt ante eu quam
      molestie, nec rutrum quam accumsan. Pellentesque porta quis sem et dictum. Curabitur varius vel metus non pulvinar.
      Donec ut magna ut nunc lacinia vestibulum et eget enim. In efficitur felis non massa vulputate, eu pellentesque nisi
      sagittis. Nulla non magna eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
      himenaeos. Quisque sodales nibh risus, ac dictum diam volutpat quis. Integer sed tortor quis libero iaculis
      interdum.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean laoreet ligula vel cursus consequat. Aenean id dolor
      felis. Mauris eget ullamcorper neque. Donec finibus libero lorem, faucibus sollicitudin dui vehicula eu. Vestibulum
      libero lorem, rutrum ac blandit euismod, elementum vel diam. Nunc at convallis mi. Aliquam tincidunt ante eu quam
      molestie, nec rutrum quam accumsan. Pellentesque porta quis sem et dictum. Curabitur varius vel metus non pulvinar.
      Donec ut magna ut nunc lacinia vestibulum et eget enim. In efficitur felis non massa vulputate, eu pellentesque nisi
      sagittis. Nulla non magna eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
      himenaeos. Quisque sodales nibh risus, ac dictum diam volutpat quis. Integer sed tortor quis libero iaculis
      interdum.
    </p>
    <p>Morbi vestibulum eu urna sed lacinia.</p>
  </div>
`;

const map = html`
  <div class="alert alert-success">
    Hier komt de kaart. Dit paneel heeft maximale breedte/hoogte en <code>overflow: hidden;</code>
  </div>
`;

const aside = html`
  <div class="dso-rich-content">
    <h2>Aside</h2>
    <p>Deze overlay valt over de andere panelen heen. Een implementator moet zorg dragen dat de rest van de applicatie niet bereikbaar is.</p>
    <div class="alert alert-info">
      Dit is een overlay
    </div>
    <p>
      Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at felis quam. Nullam commodo ex
      ultrices, viverra urna a, pretium arcu. Nunc eget cursus lorem. Sed massa nunc, maximus sodales ultrices nec, luctus
      et lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi ultrices tincidunt ipsum, sit amet
      ultricies nulla pulvinar nec. Cras sed tellus in nunc viverra aliquam. Aenean sed libero nulla. Curabitur placerat
      ullamcorper nisl, ut facilisis tortor rhoncus a. Etiam vel ex nec eros porttitor aliquam. Duis blandit vel ex at
      venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla
      sodales facilisis hendrerit.
    </p>
    <p>
      Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at felis quam. Nullam commodo ex
      ultrices, viverra urna a, pretium arcu. Nunc eget cursus lorem. Sed massa nunc, maximus sodales ultrices nec, luctus
      et lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi ultrices tincidunt ipsum, sit amet
      ultricies nulla pulvinar nec. Cras sed tellus in nunc viverra aliquam. Aenean sed libero nulla. Curabitur placerat
      ullamcorper nisl, ut facilisis tortor rhoncus a. Etiam vel ex nec eros porttitor aliquam. Duis blandit vel ex at
      venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla
      sodales facilisis hendrerit.
    </p>
    <p>
      Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at felis quam. Nullam commodo ex
      ultrices, viverra urna a, pretium arcu. Nunc eget cursus lorem. Sed massa nunc, maximus sodales ultrices nec, luctus
      et lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi ultrices tincidunt ipsum, sit amet
      ultricies nulla pulvinar nec. Cras sed tellus in nunc viverra aliquam. Aenean sed libero nulla. Curabitur placerat
      ullamcorper nisl, ut facilisis tortor rhoncus a. Etiam vel ex nec eros porttitor aliquam. Duis blandit vel ex at
      venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla
      sodales facilisis hendrerit.
    </p>
    <p>
      Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at felis quam. Nullam commodo ex
      ultrices, viverra urna a, pretium arcu. Nunc eget cursus lorem. Sed massa nunc, maximus sodales ultrices nec, luctus
      et lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi ultrices tincidunt ipsum, sit amet
      ultricies nulla pulvinar nec. Cras sed tellus in nunc viverra aliquam. Aenean sed libero nulla. Curabitur placerat
      ullamcorper nisl, ut facilisis tortor rhoncus a. Etiam vel ex nec eros porttitor aliquam. Duis blandit vel ex at
      venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla
      sodales facilisis hendrerit.
    </p>
  </div>
`;

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
      main,
      map,
      aside
    })
  }
);
