import { storiesOfInfo, Info, InfoArgs } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

export const infoTemplate = ({ fixed, richContent, onClose }: Info<TemplateResult>) => html`
  <div class="dso-info">
    ${fixed
      ? html`
        <button type="button" @click=${onClose}>
          <span class="sr-only">Sluiten</span>
        </button>
      `
      : nothing
    }
    ${richContent}
  </div>
`;

const richContent = html`
  <div class="dso-rich-content">
    <h2>Heading 2</h2>

    <p>
      Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit. Nullam non metus dolor. Pellentesque velit arcu, pellentesque at lacus sit amet, porta semper est. Praesent mollis lorem lorem, non varius nisl lacinia et. Integer quis sollicitudin arcu. <a href="#">Nullam</a> lacinia non ipsum sit amet varius. Praesent consequat ligula id tortor elementum pretium. Integer ligula justo, volutpat sed tellus eu, faucibus fringilla lectus.
    </p>

    <a href="#" class="btn btn-primary">Primaire button</a>
    <a href="#" class="btn btn-default">Secundaire button</a>
    <a href="#" class="btn btn-link btn-align">
      Tertiaire button
      <dso-icon icon="chevron-down"></dso-icon>
    </a>
  </div>
`;

storiesOfInfo<TemplateResult>({
  module,
  storiesOf,
  readme,
  template: ({ fixed, richContent, close }: InfoArgs<TemplateResult>) => infoTemplate({ fixed, richContent, onClose: close })
}, {
  richContent
});
