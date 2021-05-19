import { storiesOfHighlightBox, HighlightBoxArgs, HighlightBoxTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

// @ts-ignore
import readme from './readme.md';

const template: HighlightBoxTemplateFn<TemplateResult> = ({ yellow, white, dropShadow, border, step, icon, richContent }: HighlightBoxArgs<TemplateResult>) => html`
  <div class="dso-highlight-box ${classMap({ 'dso-yellow': yellow, 'dso-white': white, 'dso-drop-shadow': dropShadow, 'dso-border': border, 'dso-has-counter': !!(step || icon) })}">
    ${
      (step || icon) && html`
        <div class="dso-step-counter">
          ${step ?? html`
            <svg class="di di-${icon}">
              <use href="dso-icons.svg#${icon}" />
            </svg>
          `}
        </div>
      `
    }
    ${richContent}
  </div>
`;

const richContent = html`
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
`;

storiesOfHighlightBox<TemplateResult>(
  {
    module,
    storiesOf,
    readme,
    template
  },
  {
    richContent
  }
);
