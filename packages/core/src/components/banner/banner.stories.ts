import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const template: ArgsStoryFn<TemplateResult> = ({ status, richContent, onClick }: any) => html`
  <dso-banner status=${status}>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          ${richContent}
          <button type="button" class="btn btn-link" @click=${onClick}>
            <span class="sr-only">Sluiten</span>
            <dso-icon icon="times"></dso-icon>
          </button>
        </div>
      </div>
    </div>
  </dso-banner>
`;

const stories = storiesOf('Banner', module)
  .addParameters({
    docs: {
      page: readme
    },
    args: {

    },
    argTypes: {
      richContent: {
        control: {
          disable: true
        }
      },
      status: {
        options: ['warning', 'danger'],
        control: {
          type: 'select'
        }
      },
      onClick: {
        action: 'closed'
      }
    }
  });

stories.add(
  'warning',
  template,
  {
    args: {
      status: 'warning',
      richContent: html`
        <div class="dso-rich-content">
          <h2>
            Onderhoudsmelding:
          </h2>
          <p>Op <strong>zondag 8 december 2019 van 10.00 uur tot 17.00 uur</strong> vindt er onderhoud plaats aan het Omgevingsloket. <a href="#">Meer informatie</a></p>
        </div>
      `
    }
  }
);

stories.add(
  'danger',
  template,
  {
    args: {
      status: 'danger',
      richContent: html`
        <div class="dso-rich-content">
          <h2>
            Storingsmelding:
          </h2>
          <p>Op dit moment ervaren wij een storing in de Vergunningcheck. U kunt wel een aanvraag of melding indienen.</p>
        </div>
      `
    }
  }
);

stories.add(
  'rich warning',
  template,
  {
    args: {
      status: 'warning',
      richContent: html`
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
      `
    }
  }
);

stories.add(
  'danger with headings',
  template,
  {
    args: {
      status: 'danger',
      richContent: html`
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
      `
    }
  }
);
