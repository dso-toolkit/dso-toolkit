import { html } from 'lit-html';

import { examplePageFactory } from '../../../example-page-factory';
import { accordionSections1, accordionSections2 } from './resultaat.content';

examplePageFactory(
  'Toepassingen/Vergunningscheck',
  'Resultaat',
  ({ applicationHeadingTemplate, accordionTemplate }) => html`
    <div class="container">
      <main>
        <form>
          ${applicationHeadingTemplate({ title: 'Vergunningcheck', subtitle: '4. Resultaat', step: 'Stap 4/4' })}
          <!-- {% render '@application-heading', appheading %} -->

          <div class="dso-rich-content">
            <p>Hieronder staan de werkzaamheden die u heeft gekozen. Per werkzaamheid leest u voor welke juridische activiteiten u iets moet doen.</p>
            <p>Als u direct een aanvraag start, worden alle activiteiten opgeslagen in Mijn Omgevingsloket.</p>
          </div>

          <h3>Werkzaamheid verschillende acties</h3>
          ${accordionTemplate({ variant: 'conclusion', reverseAlign: true, sections: accordionSections1 })}

          <h3>Werkzaamheid verboden</h3>
          ${accordionTemplate({ variant: 'conclusion', reverseAlign: true, sections: accordionSections2 })}

          <h3>Werkzaamheid niet van toepassing</h3>
          <div class="dso-rich-content">
            <p>Het systeem heeft geen regels kunnen vinden voor uw situatie. Kijk of u de juiste werkzaamheid heeft ingevuld en of u de vragen correct heeft beantwoord. Zo ja, neem dan contact op met uw gemeente en waterschap.</p>
          </div>

          <h3>Werkzaamheid - content</h3>
          ${accordionTemplate({ variant: 'conclusion', reverseAlign: true, sections:
            [
              {
                handleTitle: 'H4 actie nodig van de gebruiker voor 5 activiteiten.',
                heading: 'h4',
                icon: 'forbidden',
                open: true
              }
            ]
          })}
          <!-- <div class="dso-accordion dso-accordion-conclusion dso-accordion-reverse-align">
            <div class="dso-accordion-section dso-open">
              <h4 class="dso-section-handle">
                <a href="#" aria-expanded="false">
                  <span class="dso-icon">
                    {% render '@icon', {icon: 'forbidden'} -%}
                  </span>
                  H4 actie nodig van de gebruiker voor 5 activiteiten.
                </a>
              </h4>
              <div class="dso-section-body">
                <div class="dso-rich-content">
                  <ul>
                    <li>Activiteit 1</li>
                    <li>
                      Activiteit 2
                      <div class="dso-info">
                        <div class="dso-rich-content">
                          <p><strong>Let op:</strong> <i>voorbehoud A bij activiteit 2.</i></p>
                        </div>
                      </div>
                      <div class="dso-info">
                        <div class="dso-rich-content">
                          <p><strong>Let op:</strong> <i>voorbehoud B bij activiteit 2.</i></p>
                        </div>
                      </div>
                      <div class="dso-info">
                        <div class="dso-rich-content">
                          <p>Toelichting bij activiteit 2.</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      Activiteit 3
                      <ul>
                        <li>
                          Activiteit 3.1
                          <div class="dso-info">
                            <div class="dso-rich-content">
                              <p><strong>Let op:</strong> <i>voorbehoud bij activiteit 3.1.</i></p>
                            </div>
                          </div>
                          <div class="dso-info">
                            <div class="dso-rich-content">
                              <p>Toelichting bij activiteit 3.1.</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          Activiteit 3.2
                          <div class="dso-info">
                            <div class="dso-rich-content">
                              <p><strong>Let op:</strong> <i>voorbehoud bij activiteit 3.2.</i></p>
                            </div>
                          </div>
                          <div class="dso-info">
                            <div class="dso-rich-content">
                              <p>Toelichting bij activiteit 3.2.</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <p class="text-muted">Voor deze vragen missen we vragen van de Rijksoverheid. Dit betekent dat u misschien toch een vergunning of melding nodig heeft. De gemeente kan u vertellen van wat u moet indienen. Neem voor de volgende activiteiten contact op:</p>
                  <ul>
                    <li>
                      Activiteit 4
                      <ul>
                        <li>
                          Activiteit 4.1
                        </li>
                      </ul>
                    </li>
                    <li>
                        Activiteit 5
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> -->

          <div class="dso-form-buttons">
            <div class="dso-aside">
              {% render '@button', {label:'Download resultaat als pdf', type:'button', modifier:'dso-secondary btn-align', icon: 'download'} %}
            </div>
          </div>

          <div class="dso-form-buttons">
            <div class="dso-aside">
              {% render '@button', {label:'Vorige stap', type:'button', modifier:'dso-tertiary btn-align', icon: 'chevron-left'} %}
            </div>
            {% render '@button', {label:'Opslaan in Mijn Omgevingsloket', type:'button', modifier:'dso-secondary'} %}
            {% render '@button', {label:'Naar aanvragen', type:'button', modifier:'dso-primary'} %}
          </div>
        </form>

        <hr>

        <div class="dso-rich-content">
          <p>
            <em class="text-muted">De Vergunningcheck is een serviceproduct van de Nederlandse overheid. Het geeft u een algemene indruk of er voor uw activiteit een vergunning of melding nodig is. De makers van de Vergunningcheck hebben met veel aandacht gewerkt aan de vragen en antwoorden. Toch geeft het resultaat van de Vergunningcheck u geen absolute zekerheid. Bijvoorbeeld doordat sommige activiteiten of combinaties van activiteiten (nog) niet in de Vergunningcheck staan. Of doordat er nog andere regels zijn waardoor u nog andere vergunningen moet aanvragen of andere meldingen moet doen. U kunt daarom geen rechten ontlenen aan deze Vergunningcheck. Wilt u zeker weten of en hoe u uw activiteit kunt uitvoeren? Dan raden wij u aan contact op te nemen met uw gemeente en/of waterschap.</em>
          </p>
        </div>
      </main>
    </div>
  `
);
