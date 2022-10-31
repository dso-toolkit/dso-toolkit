import { html } from 'lit-html';

import { examplePageFactory } from '../../../example-page-factory';
import { definitionList1, definitionlist2, radios } from './omgevingsoverleg.content';

examplePageFactory(
  'Toepassingen/Aanvragen',
  'Omgevingsoverleg',
  ({ applicationHeadingTemplate, definitionListTemplate, formButtonsTemplate, formGroupRadiosTemplate }) => html`
    <div class="container">
      <main>
        <form>
          ${applicationHeadingTemplate({ title: 'Aanvraag Laan van Eik en Duinen 125, Den Haag', subtitle: '7. Verzoeken indienen', step: 'Stap 7/7' })}
          ${formGroupRadiosTemplate(radios)}
          ${definitionListTemplate(definitionList1)}
          ${definitionListTemplate(definitionlist2)}
          ${formButtonsTemplate({ buttons: [{ label: 'Volgende', variant: 'primary', type: 'submit', icon: { icon: 'chevron-right' }, iconMode: 'after' }], asideButtons: [{ label: 'Vorige', variant: 'tertiary', icon: { icon: 'chevron-left' } }] })}
        </form>
      </main>
    </div>
  `
);
