import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const template: ArgsStoryFn<TemplateResult> = ({ yellow, white, dropShadow, border, step, icon, richContent }: any) => html`
  <dso-highlight-box
    ?yellow=${yellow}
    ?white=${white}
    ?drop-shadow=${dropShadow}
    ?border=${border}
    step=${ifDefined(typeof step === 'number' && step > 0 ? step : undefined)}
  >
    ${icon && html`
      <dso-icon slot="icon" icon=${icon}></dso-icon>
    `}
    ${richContent}
  </dso-highlight-box>
`;

const stories = storiesOf('Highlight Box', module)
  .addParameters({
    docs: {
      page: readme
    },
    args: {
      yellow: false,
      white: false,
      border: false,
      dropShadow: false,
      step: null,
      icon: null,
      richContent: html`
        <div class="dso-rich-content">
          <h3>Toelichting: Vergunningvrij onder voorbehoud</h3>
          <p>Het Informatiehuis Bouw kent, op basis van de huidige gebruikerswensen, vier Informatieproducten, namelijk het Opleverdossier, de Bouwregelgeving, de Vergunningvrije bouwwerken en een Digitaliseringshulp.</p>
          <p>Het Opleverdossier (zie voor een nadere omschrijving van de informatieproducten de volgende paragrafen) is de, door gebruikers gewenste, centrale registratie waarin alle informatie over een bouwwerk is opgenomen. Het gaat hierbij om de tekeningen, berekeningen en de resultaten van de kwaliteitsborging (zoals toetsen en inspecties).</p>
          <p>De <a href="#">Bouwregelgeving</a> is een database met alle bouwregelgeving in Nederland, die op zodanige wijze moet zijn ingericht en ontsloten dat die voldoet aan de eisen van de Omgevingswet (3B's), en daarmee bruikbaar is in de ontwerp- en toetsingsfase van ieder bouwwerk.</p>
          <p>Het derde informatieproduct zijn de Vergunningvrije bouwwerken, hierin zijn opgenomen de (bekende) bouwwerken die vergunningvrij, maar niet regelvrij, zijn gerealiseerd. Het vierde en vooralsnog laatste informatieproduct is de Digitaliseringshulp, een service voor het centraal en gestandaardiseerd digitaliseren van documenten.</p>
          <a href="#" class="btn btn-primary">Primaire button</a>
          <a href="#" class="btn btn-default">Secundaire button</a>
          <a href="#" class="btn btn-link btn-align">
            Tertiaire button
            <dso-icon icon="chevron-down"></dso-icon>
          </a>
        </div>
      `
    },
    argTypes: {
      yellow: {
        control: {
          type: 'boolean'
        }
      },
      white: {
        control: {
          type: 'boolean'
        }
      },
      dropShadow: {
        control: {
          type: 'boolean'
        }
      },
      border: {
        control: {
          type: 'boolean'
        }
      },
      step: {
        control: {
          type: 'number',
          min: 0
        }
      },
      icon: {
        control: {
          type: 'select',
          options: [undefined, 'plus', 'table']
        }
      }
    }
  });

stories.add(
  'default',
  template
);

stories.add(
  'yellow',
  template,
  {
    args: {
      yellow: true
    }
  }
);

stories.add(
  'white with dropshadow',
  template,
  {
    args: {
      white: true,
      dropShadow: true
    }
  }
);

stories.add(
  'with border',
  template,
  {
    args: {
      border: true
    }
  }
);

stories.add(
  'with step',
  template,
  {
    args: {
      yellow: true,
      step: 2
    }
  }
);

stories.add(
  'with icon',
  template,
  {
    args: {
      yellow: true,
      icon: 'plus'
    }
  }
);
