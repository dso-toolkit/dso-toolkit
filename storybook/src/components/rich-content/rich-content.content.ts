import { html } from "lit-html";

export function children() {
  return html`
    <div class="dso-rich-content">
      <h1>Kop 1</h1>
      <h2>Kop 2</h2>
      <h3>Kop 3</h3>
      <h4>Kop 4</h4>
      <p>We ondersteunen <em>emphasis</em>, <strong>strong</strong>, <i>italic</i>, <b>bold</b> en <u>underline</u>.</p>
      <p>
        Verder doen we aan <sub>lage</sub> en <sup>hoge</sup> letters en voegen we wel eens wat <del>weg</del
        ><ins>toe</ins>.
      </p>
      <p>Een {% render '@anchor', {label: 'externe link', url: '#', modifier: 'extern') %} maak je zo</p>
      <p>{% render '@image' %}</p>
      <ul>
        <li>Ongesorteerde lijst</li>
        <li>Item 2</li>
      </ul>
      <ol>
        <li>Gesorteerde lijst</li>
        <li>Item 2</li>
      </ol>
      <blockquote>
        <p>Citeren doen we zo</p>
      </blockquote>
      <p>Zo maken we een <em>horizontal rule</em></p>
      <hr />
      <p>Een tabel kan dit:</p>
      {% render '@table', tableContext, true %}
      <p>Een lijst met definities gaat zo:</p>
      {% render '@definition-list' %}
      <p>Een highlight box in de tekst gaat zo:</p>
      <dso-highlight-box>
        <div class="dso-rich-content">
          <h3>Toelichting: Vergunningvrij onder voorbehoud</h3>
          <p>
            Het Informatiehuis Bouw kent, op basis van de huidige gebruikerswensen, vier Informatieproducten, namelijk
            het Opleverdossier, de Bouwregelgeving, de Vergunningvrije bouwwerken en een Digitaliseringshulp.
          </p>
          <p>
            Het Opleverdossier (zie voor een nadere omschrijving van de informatieproducten de volgende paragrafen) is
            de, door gebruikers gewenste, centrale registratie waarin alle informatie over een bouwwerk is opgenomen.
            Het gaat hierbij om de tekeningen, berekeningen en de resultaten van de kwaliteitsborging (zoals toetsen en
            inspecties).
          </p>
          <p>
            De <a href="#">Bouwregelgeving</a> is een database met alle bouwregelgeving in Nederland, die op zodanige
            wijze moet zijn ingericht en ontsloten dat die voldoet aan de eisen van de Omgevingswet (3B's), en daarmee
            bruikbaar is in de ontwerp- en toetsingsfase van ieder bouwwerk.
          </p>
          <p>
            Het derde informatieproduct zijn de Vergunningvrije bouwwerken, hierin zijn opgenomen de (bekende)
            bouwwerken die vergunningvrij, maar niet regelvrij, zijn gerealiseerd. Het vierde en vooralsnog laatste
            informatieproduct is de Digitaliseringshulp, een service voor het centraal en gestandaardiseerd
            digitaliseren van documenten.
          </p>
          <div class="dso-button-row">
            <a href="#" class="dso-primary">Primaire button</a>
            <a href="#" class="dso-secondary">Secundaire button</a>
            <a href="#" class="dso-tertiary btn-align">
              Tertiaire button
              <dso-icon icon="chevron-down"></dso-icon>
            </a>
          </div>
        </div>
      </dso-highlight-box>
      <p>
        Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard
        proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze
        door elkaar husselde om een font-catalogus te maken.
      </p>
      <p>{% render '@image', {source: '/dummy/images/ocean-480.jpg', alt: 'Afbeelding van een oceaangolf'} %}</p>
      <p>
        Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische
        letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum
        passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum
        bevatten.
      </p>
      <p>
        In tegenstelling tot wat algemeen aangenomen wordt is Lorem Ipsum niet zomaar willekeurige tekst. het heeft zijn
        wortels in een stuk klassieke latijnse literatuur uit 45 v.Chr. en is dus meer dan 2000 jaar oud.
      </p>
      <p>{% render '@image' %}</p>
      <p>
        Richard McClintock, een professor latijn aan de Hampden-Sydney College in Virginia, heeft één van de meer
        obscure latijnse woorden, consectetur, uit een Lorem Ipsum passage opgezocht, en heeft tijdens het zoeken naar
        het woord in de klassieke literatuur de onverdachte bron ontdekt.
      </p>
      <p>Aansprakelijkheidswaardevaststellingsveranderingen is het langste woord in de Nederlandse taal.</p>
      <p>Een afsluitende paragraaf.</p>
    </div>
  `;
}
