import { storiesOfBanner } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

import { bannerTemplate } from './banner.template';
import readme from './readme.md';

const warningRichContent = html`
  <div class="dso-rich-content">
    <h2>
      Onderhoudsmelding:
    </h2>
    <p>Op <strong>zondag 8 december 2019 van 10.00 uur tot 17.00 uur</strong> vindt er onderhoud plaats aan het Omgevingsloket. <a href="#">Meer informatie</a></p>
  </div>
`;

const dangerRichContent = html`
  <div class="dso-rich-content">
    <h2>
      Storingsmelding:
    </h2>
    <p>Op dit moment ervaren wij een storing in de Vergunningcheck. U kunt wel een aanvraag of melding indienen.</p>
  </div>
`;

const richWarningRichContent = html`
  <div class="dso-rich-content">
    <h2>
      Onderhoudsmelding:
    </h2>
    <p>Banners zullen vaak worden ingezet voor 'one-liners', maar kunnen ook rijkere content bevatten, zoals meerdere paragrafen, en/of een geordende lijst. Zolang de markup maar aan de juiste voorschriften voldoet gaat dit prima:</p>
    <ul>
      <li>class <code>.dso-rich-content</code> op de omringende <code>&lt;div&gt;</code></li>
      <li>een <code>&lt;p&gt;</code>-tag om paragrafen</li>
    </ul>
  </div>
`;

const dangerWithHeadingsRichContent = html`
  <div class="dso-rich-content">
    <h2>
      Storingsmelding:
    </h2>
    <p>Op dit moment ervaren wij een storing in de Vergunningcheck. U kunt wel een aanvraag of melding indienen.</p>
    <h2>Dit is een H2</h2>
    <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
    <h3>Dit is een H3</h3>
    <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
    <h4>Dit is een H4</h4>
    <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
    <h5>Dit is een H5</h5>
    <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
    <h6>Dit is een H6</h6>
    <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
  </div>
`;

storiesOfBanner<TemplateResult>(
  {
    module,
    storiesOf,
    readme
  },
  {
    bannerTemplate,
    warningRichContent,
    dangerRichContent,
    richWarningRichContent,
    dangerWithHeadingsRichContent
  }
);
