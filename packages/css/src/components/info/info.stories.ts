import { storiesOfInfo } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
import { html } from 'lit-html';

import { anchorTemplate } from '../anchor/anchor.template';
import { buttonTemplate } from '../button/button.template';

import { infoTemplate } from './info.template';
import readme from './readme.md';

const richContent = html`
  <div class="dso-rich-content">
    <h2>Heading 2</h2>

    <p>
      Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit. Nullam non metus dolor. Pellentesque velit arcu, pellentesque at lacus sit amet, porta semper est. Praesent mollis lorem lorem, non varius nisl lacinia et. Integer quis sollicitudin arcu. ${anchorTemplate({ url: '#', label: 'Nullam' })} lacinia non ipsum sit amet varius. Praesent consequat ligula id tortor elementum pretium. Integer ligula justo, volutpat sed tellus eu, faucibus fringilla lectus.
    </p>

    ${buttonTemplate({ url: '#', modifier: 'btn btn-primary', label: 'Primaire button' })}
    ${buttonTemplate({ url: '#', modifier: 'btn btn-default', label: 'Secundaire button' })}
    ${buttonTemplate({ url: '#', modifier: 'btn btn-link btn-align', label: 'Tertiaire button', icon: { icon: 'chevron-down' }, iconMode: 'after' })}
  </div>
`;

storiesOfInfo(
  {
    module,
    storiesOf,
    readme
  },
  {
    infoTemplate,
    richContent
  }
);
