import { storiesOfHighlightBox } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
import { html } from 'lit-html';

import { iconTemplate } from '../icon/icon.template';

import { highlightBoxTemplate } from './highlight-box.template';
import readme from './readme.md';

const richContent = html`
  <div class="dso-rich-content">
    <h3>Toelichting: Vergunningvrij onder voorbehoud</h3>
    <p>Het Informatiehuis Bouw kent, op basis van de huidige gebruikerswensen, vier Informatieproducten, namelijk het Opleverdossier, de Bouwregelgeving, de Vergunningvrije bouwwerken en een Digitaliseringshulp.</p>
    <p>Het Opleverdossier (zie voor een nadere omschrijving van de informatieproducten de volgende paragrafen) is de, door gebruikers gewenste, centrale registratie waarin alle informatie over een bouwwerk is opgenomen. Het gaat hierbij om de tekeningen, berekeningen en de resultaten van de kwaliteitsborging (zoals toetsen en inspecties).</p>
    <p>De <a href="#">Bouwregelgeving</a> is een database met alle bouwregelgeving in Nederland, die op zodanige wijze moet zijn ingericht en ontsloten dat die voldoet aan de eisen van de Omgevingswet (3B's), en daarmee bruikbaar is in de ontwerp- en toetsingsfase van ieder bouwwerk.</p>
    <p>Het derde informatieproduct zijn de Vergunningvrije bouwwerken, hierin zijn opgenomen de (bekende) bouwwerken die vergunningvrij, maar niet regelvrij, zijn gerealiseerd. Het vierde en vooralsnog laatste informatieproduct is de Digitaliseringshulp, een service voor het centraal en gestandaardiseerd digitaliseren van documenten.</p>
    <div class="dso-button-row">
      <a href="#" class="btn btn-primary">Primaire button</a>
      <a href="#" class="btn btn-default">Secundaire button</a>
      <a href="#" class="btn btn-link btn-align">
        Tertiaire button
        ${iconTemplate({ icon: 'chevron-down' })}
      </a>
    </div>
  </div>
`;

storiesOfHighlightBox(
  {
    module,
    storiesOf,
    readme,
  },
  {
    highlightBoxTemplate,
    richContent
  }
);
