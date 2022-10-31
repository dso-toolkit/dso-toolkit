import { html } from 'lit-html';

import { examplePageFactory } from '../../example-page-factory';
import { footerPartial } from '../partials/footer';
import { headerPartial } from '../partials/header';
import { header } from '../partials/header.content';
import { cardList } from './zoeken-in-lijst-cards.content';

examplePageFactory(
  'Patronen',
  'Zoeken in lijst cards',
  ({ applicationHeadingTemplate, searchBarTemplate, badgeTemplate, cardListTemplate, selectableTemplate, footnoteTemplate }, templates) => html`
    <div class="container">
      {% render '@header', {menu: menu, breadcrumbs: breadcrumbs} %}
      ${headerPartial(templates, { ...header, mainMenu: [{ label: 'Regels op de kaart', url: '#' }, { label: 'Zoeken in wetgeving', url: '#', active: true }] })}

      <main>
        <div>
          <h1>Zoeken in wetgeving</h1>
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.${footnoteTemplate({ number: 14, label: 'Foreest Groen Consult (2018) Quickscan natuuronderzoek Ontwikkeling Herveld-Noord. 26 juli 2018.' })}
          <div class="row">
            <div class="col-md-8">
              ${applicationHeadingTemplate({ subtitle: 'Wetgeving Gemeente Den Haag' })}
              ${searchBarTemplate({ buttonLabel: 'Zoeken', hideSearchButton: true, id: 'search-bar--hidden-button', label: 'Zoeken in Lijst', placeholder: 'Zoek op naam, datum, initiator of status', icon: true })}
              <h5>Actieve filters: ${badgeTemplate({ message: 'Omgevingswet document', status: 'success' })}${badgeTemplate({ message: 'Geldige oude wetgeving', status: 'warning' })}</h5>
              ${cardListTemplate(cardList)}
            </div>
            <div class="col-md-4">
              <h2 class="dso-steps-indicator">Filters</h2>
              <form>
                <fieldset>
                  <legend hidden></legend>
                  <fieldset class="form-group dso-checkboxes">
                    <legend class="sr-only">Selecteer uw gewenste filter</legend>
                    <div class="dso-label-container">
                      <span class="control-label" aria-hidden="true">
                        Selecteer uw gewenste filter
                      </span>
                    </div>
                    <div class="dso-field-container">
                      ${selectableTemplate({ type: 'checkbox', id: 'aanhanger-0', name: 'aanhanger', label: html`${badgeTemplate({ message: 'Omgevingswet document', status: 'success' })}`, value: 'bak', checked: true })}
                      ${selectableTemplate({ type: 'checkbox', id: 'aanhanger-1', name: 'aanhanger', label: html`${badgeTemplate({ message: 'Geldige oude wetgeving', status: 'warning' })}`, value: 'caravan', checked: true })}
                      ${selectableTemplate({ type: 'checkbox', id: 'aanhanger-2', name: 'aanhanger', label: html`${badgeTemplate({ message: 'Niet geldige oude wetgeving', status: 'danger' })}`, value: 'fietsendrager' })}
                    </div>
                  </fieldset>
                </fieldset>
              </form>
            </div>
          </div>
          <ol class="dso-footnotes">
            <li class="dso-footnote" id="voetnoot14">14. <a href="#voetnoot14link" class="dso-footnote-backlink" aria-label="Terug naar voetnoot 14" title="Terug naar voetnoot 14"></a> Foreest Groen Consult (2018) Quickscan natuuronderzoek Ontwikkeling Herveld-Noord. 26 juli 2018.</li>
          </ol>
        </div>
      </main>
      ${footerPartial(templates)}
    </div>
  `
);
