import { html } from 'lit-html';

import { examplePageFactory } from '../../../example-page-factory';
import { dropdownItems } from './locatie.content';

examplePageFactory(
  'Toepassingen/Aanvragen',
  'Locatie',
  ({ applicationHeadingTemplate, dropdownMenuTemplate, formGroupSelectTemplate, formGroupInputTemplate, formButtonsTemplate, buttonTemplate }) => html`
    <style>
      .dso-map-example {
        background-image: url("/images/map-lved125.png");
        background-size: cover;
        height: 400px;
        margin: 32px 0;
        width: 100%;
      }
    </style>

    <div class="container">
      <main>
        ${applicationHeadingTemplate({ title: 'Aanvraag Laan van Eik en Duinen 125, Den Haag', subtitle: '2. Locatie', step: 'Stap 2/7' })}
        <form>
          <div class="row">
            <div class="col-md-9">
              <h3>Coordinaten</h3>
            </div>
            <div class="col-md-3 text-right">
              ${dropdownMenuTemplate({ button: { variant: 'tertiary', label: 'Meer zoekopties' }, id: 'locatie--dropdownmenu', groups: dropdownItems })}
              <!-- {% render '@dropdown-menu-css', dropdownButton %} -->
            </div>
          </div>
          <div class="dso-justify-form-groups">
            ${formGroupSelectTemplate({ group: 'select', id: 'type', label: 'Type', items: [{ options: [{ label: 'RD', value: 'rd' }, { label: 'WGS84', value: 'wgs84', selected: true }] }] })}
            ${formGroupInputTemplate({ group: 'input', type: 'text', id: 'locatie--latt', label: 'Lattitude', value: '52.07066496' })}
            ${formGroupInputTemplate({ group: 'input', type: 'text', id: 'locatie--long', label: 'Longitude', value: '4.26389251' })}

            ${formButtonsTemplate({ buttons: [{ label: 'Zoeken', type: 'button', variant: 'secondary', modifier: 'btn-sm' }] })}
          </div>
          <div class="dso-map-example"></div>
          <div class="dso-form-buttons">
            <div class="dso-aside">
              ${buttonTemplate({ type: 'button', variant: 'tertiary', label: 'Vorige stap', icon: { icon: 'chevron-left' } })}
            </div>
            ${buttonTemplate({ type: 'submit', variant: 'primary', label: 'Volgende stap', icon: { icon: 'chevron-right' }, iconMode: 'after' })}
          </div>
        </form>
      </main>
    </div>
  `
);
