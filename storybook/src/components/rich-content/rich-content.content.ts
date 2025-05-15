import { html } from "lit-html";

import { Templates } from "../../templates";

export function children({ linkTemplate, imageTemplate, richContentTemplate, buttonRowTemplate }: Templates) {
  return richContentTemplate({
    children: html`
      <h1>Kop 1</h1>
      <h2>Kop 2</h2>
      <h3>Kop 3</h3>
      <h4>Kop 4</h4>
      <p>We ondersteunen <em>emphasis</em>, <strong>strong</strong>, <i>italic</i>, <b>bold</b> en <u>underline</u>.</p>
      <p>
        Verder doen we aan <sub>lage</sub> en <sup>hoge</sup> letters en voegen we wel eens wat <del>weg</del
        ><ins>toe</ins>.
      </p>
      <p>Een ${linkTemplate({ label: "externe link", url: "#", mode: "extern" })} maak je zo</p>
      <ul>
        <li>Ongesorteerde lijst</li>
        <li>Item 2</li>
      </ul>
      <ul>
        <li>
          Ongesorteerde lijst
          <ul>
            <li>Geneste ongesorteerde lijst</li>
            <li>Item 2</li>
          </ul>
        </li>
        <li>Item 2</li>
      </ul>
      <ol>
        <li>Gesorteerde lijst</li>
        <li>Item 2</li>
      </ol>
      <ol>
        <li>
          Gesorteerde lijst
          <ol>
            <li>Genseste gesorteerde lijst</li>
            <li>Item 2</li>
          </ol>
        </li>
        <li>Item 2</li>
      </ol>
      <blockquote>
        <p>Citeren doen we zo</p>
      </blockquote>
      <p>Zo maken we een <em>horizontal rule</em></p>
      <hr />
      <p>Een highlight box in de tekst gaat zo:</p>
      <dso-highlight-box>
        ${richContentTemplate({
          children: html`
            <h3>Toelichting: Vergunningvrij onder voorbehoud</h3>
            <p>
              Het Informatiehuis Bouw kent, op basis van de huidige gebruikerswensen, vier Informatieproducten, namelijk
              het Opleverdossier, de Bouwregelgeving, de Vergunningvrije bouwwerken en een Digitaliseringshulp.
            </p>
            <p>
              Het Opleverdossier (zie voor een nadere omschrijving van de informatieproducten de volgende paragrafen) is
              de, door gebruikers gewenste, centrale registratie waarin alle informatie over een bouwwerk is opgenomen.
              Het gaat hierbij om de tekeningen, berekeningen en de resultaten van de kwaliteitsborging (zoals toetsen
              en inspecties).
            </p>
            <p>
              De
              ${linkTemplate({
                label: "Bouwregelgeving",
                url: "#",
                mode: "download",
              })}
              is een database met alle bouwregelgeving in Nederland, die op zodanige wijze moet zijn ingericht en
              ontsloten dat die voldoet aan de eisen van de Omgevingswet (3B's), en daarmee bruikbaar is in de ontwerp-
              en toetsingsfase van ieder bouwwerk.
            </p>
            <p>
              Het derde informatieproduct zijn de Vergunningvrije bouwwerken, hierin zijn opgenomen de (bekende)
              bouwwerken die vergunningvrij, maar niet regelvrij, zijn gerealiseerd. Het vierde en vooralsnog laatste
              informatieproduct is de Digitaliseringshulp, een service voor het centraal en gestandaardiseerd
              digitaliseren van documenten.
            </p>
            ${buttonRowTemplate({
              buttons: [
                { label: "Primaire button", variant: "primary", url: "#" },
                { label: "Secundaire button", variant: "secondary", url: "#" },
                { label: "Tertiare button", variant: "tertiary", icon: { icon: "chevron-down" }, iconMode: "after" },
              ],
            })}
          `,
        })}
      </dso-highlight-box>
      <p>
        Deze paragraaf is slechts een proeftekst uit het drukkerij- en zetterijwezen. Deze paragraaf is de standaard
        proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze
        door elkaar husselde om een font-catalogus te maken.
      </p>
      <p>${imageTemplate({ source: "/dummy/images/ocean-480.jpg", alt: "Afbeelding van een oceaangolf" })}</p>
      <p>
        Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische
        letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met deze
        paragraaf passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van
        deze paragraaf bevatten.
      </p>
      <p>
        In tegenstelling tot wat algemeen aangenomen wordt is deze paragraaf niet zomaar willekeurige tekst. het heeft
        zijn wortels in een stuk klassieke latijnse literatuur uit 45 v.Chr. en is dus meer dan 2000 jaar oud.
      </p>
      <p>
        Richard McClintock, een professor latijn aan de Hampden-Sydney College in Virginia, heeft één van de meer
        obscure latijnse woorden, consectetur, uit een deze paragraaf passage opgezocht, en heeft tijdens het zoeken
        naar het woord in de klassieke literatuur de onverdachte bron ontdekt.
      </p>
      <p>Aansprakelijkheidswaardevaststellingsveranderingen is het langste woord in de Nederlandse taal.</p>
      <p>Een afsluitende paragraaf.</p>
    `,
  });
}
