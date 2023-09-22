import { html } from "lit-html";
import { Templates } from "../../templates";

export const activeBody = html`<p>
  U wilt de werkzaamheid <strong>Dakkapel plaatsen, vervangen of veranderen</strong> verwijderen. Uw antwoorden op de
  vragen worden dan ook verwijderd. Wilt u doorgaan?
</p>`;

export function activeFooter({ buttonTemplate }: Templates) {
  return html`
    ${buttonTemplate({ label: "Annuleren", type: "button", variant: "tertiary" })}
    ${buttonTemplate({ label: "Secundaire actie", type: "button", variant: "secondary" })}
    ${buttonTemplate({ label: "Bevestigen", type: "button", variant: "primary" })}
  `;
}

export function passiveBody({ listTemplate }: Templates) {
  return html`
    <p>Gebruik de volgende bestandsformaten voor een document:</p>
    ${listTemplate({
      items: [
        { text: "Foto's en gescande documenten: PNG, TIFF" },
        { text: "Digitale documenten: ODT1.2, PDF/A-1, PDF/A-2" },
        { text: "Tekeningen: PDF/A-2, 5VG" },
        { text: "Spreadsheet: [SV, 0E1512, PDF/A" },
      ],
    })}
    <p>
      Als u documenten in een ander formaat opstuurt, moet u het document mogelijk nog een keer sturen, maar dan in het
      juiste bestandsformaat. Dit geldt voor:
    </p>
    ${listTemplate({
      items: [
        { text: "Digitale documenten: DOC, DOCX PDF1.7" },
        { text: "Foto's en gescande documenten: WEG" },
        { text: "Geografische bestanden (2D en 3D): GML33.1 ESRI SHAPE (inclusief aanvullende metabestanden)" },
        { text: "Tekeningen: DXF, PDF 17" },
        { text: "Bint-bestanden (2D en 30): IFC en IFCXML" },
        { text: "Spreadsheet: XLS, XLSX" },
        { text: "Data: XML en RDF" },
        { text: "Lozingsrisico's SDF" },
        { text: "CAD bestanden: DWG, DGN en DXF" },
      ],
    })}
  `;
}

export function passiveFooter({ buttonTemplate }: Templates) {
  return buttonTemplate({ label: "Sluiten", variant: "tertiary", type: "button" });
}

export function confirmBody({ anchorTemplate }: Templates) {
  return html`
    <p>
      Welkom op het nieuwe Omgevingsloket. Deze website is nog in ontwikkeling. Dat betekent dat bepaalde onderdelen nog
      niet beschikbaar zijn. En dat u geen rechten kunt ontlenen aan de teksten in de vergunningcheck en regels op de
      kaart. Ook kunt u nog geen aanvraag of melding indienen via dit loket.
    </p>
    <p>
      De website ${anchorTemplate({ label: "Aan de slag met de omgevingswet", url: "#" })} biedt extra uitleg over het
      Omgevingsloket en de ontwikkeling ervan. Ook vindt u informatie over hoe u kunt oefenen met aansluiten van uw
      lokale systemen op het loket.
    </p>
  `;
}
export function confirmFooter({ buttonTemplate }: Templates) {
  return html`
    ${buttonTemplate({ label: "Secundaire actie", variant: "secondary", type: "button" })}
    ${buttonTemplate({ label: "Bevestigen", variant: "primary", type: "button" })}
  `;
}

export function loadingBody({ progressIndicatorTemplate }: Templates) {
  return progressIndicatorTemplate({
    label: "Resultaten laden. Een moment geduld.",
    block: true,
  });
}

export const fullscreenBody = html`
  <h1>Introductie</h1>
  <blockquote><p>De DSO Toolkit: wat is het, voor wie is het en hoe werkt het?</p></blockquote>
  <p>
    De DSO Toolkit is een set van ontwerpprincipes, componenten, en templates waarmee een consistente gebruikerservaring
    gemaakt kan worden. Het helpt tijd en middelen te besparen bij het starten of het verder ontwikkelen van een
    platform voor het Omgevingsloket.
  </p>
  <h2 class="anchor anchorWithStickyNavbar_JmGV" id="waar-kan-de-dso-toolkit-mij-bij-helpen">
    Waar kan de DSO Toolkit mij bij helpen?<a
      href="#waar-kan-de-dso-toolkit-mij-bij-helpen"
      class="hash-link"
      aria-label="Direct link naar Waar kan de DSO Toolkit mij bij helpen?"
      title="Direct link naar Waar kan de DSO Toolkit mij bij helpen?"
      >&ZeroWidthSpace;</a
    >
  </h2>
  <p>Per teamrol is beschreven welke secties, tools, en ondersteunende middelen interessant zijn.</p>
  <ul class="">
    <li><a href="/58.3.1/voor-developers">Developers</a></li>
    <li><a href="/58.3.1/voor-designers">Ontwerpers</a></li>
    <li><a href="/58.3.1/voor-productowners">Product owners</a></li>
  </ul>
  <h3 class="anchor anchorWithStickyNavbar_JmGV" id="slack">
    Slack<a href="#slack" class="hash-link" aria-label="Direct link naar Slack" title="Direct link naar Slack"
      >&ZeroWidthSpace;</a
    >
  </h3>
  <p>Voor de communicatie binnen de toolkit is een Slack omgeving beschikbaar:</p>
  <ul class="">
    <li>
      <a href="https://dso-toolkit.slack.com/" target="_blank" rel="noopener noreferrer"
        >direct naar DSO-toolkit Slack</a
      >
    </li>
    <li>
      <a
        href="https://join.slack.com/t/dso-toolkit/shared_invite/zt-58125gbo-FtPAARcnU47rMgkT7KWikA"
        target="_blank"
        rel="noopener noreferrer"
        >join DSO-toolkit Slack</a
      >
    </li>
  </ul>
  <h2
    class="anchor anchorWithStickyNavbar_JmGV"
    id="een-platform-proces-of-dienst-is-nooit-af-daarom-iteratief-ontwerpen"
  >
    Een platform, proces of dienst is nooit af, daarom iteratief ontwerpen.<a
      href="#een-platform-proces-of-dienst-is-nooit-af-daarom-iteratief-ontwerpen"
      class="hash-link"
      aria-label="Direct link naar Een platform, proces of dienst is nooit af, daarom iteratief ontwerpen."
      title="Direct link naar Een platform, proces of dienst is nooit af, daarom iteratief ontwerpen."
      >&ZeroWidthSpace;</a
    >
  </h2>
  <p>
    Iteratief ontwerpen is een continu verbeteringsproces van een website, product of dienst. Dit wordt georganiseerd
    door verschillende cycli van tests en gebruikersevaluaties te organiseren, om verbeteringen te vinden, te verwerken
    en vervolgens weer te testen.
  </p>
  <p>
    De beste manier om deze tests uit te voeren is in zo realistisch mogelijke condities. Wees daarom voorbereid op het
    moment van live gaan met een testplan om meteen inzichten te verzamelen, zodat de cycli van verbeteren en testen
    meteen kan beginnen.
  </p>
  <p>
    Het platform waar je aan werkt zal daarom nooit compleet af zal zijn. Developers, ontwerpers en stakeholders zijn
    altijd op zoek naar manieren om de gebruikerservaring te verbeteren. Zijn er in de toekomst verbeteringen die zo
    onmisbaar zijn dat ze opgenomen moeten worden in de toolkit, kijk dan naar de procespagina over hoe je kan bijdragen
    aan de toolkit.
  </p>
  <p>Links naar relevante pagina's:</p>
  <ul class="">
    <li>Gebruikerstesten organiseren en resultaten verwerken (onder ontwikkeling)</li>
    <li>Data analyse voor het verbeteren van je platform (onder ontwikkeling)</li>
  </ul>
  <h2 class="anchor anchorWithStickyNavbar_JmGV" id="digitale-toegankelijkheid">
    Digitale toegankelijkheid<a
      href="#digitale-toegankelijkheid"
      class="hash-link"
      aria-label="Direct link naar Digitale toegankelijkheid"
      title="Direct link naar Digitale toegankelijkheid"
      >&ZeroWidthSpace;</a
    >
  </h2>
  <p>
    Per 1 juli 2018 is het
    <em
      ><a href="https://www.digitoegankelijk.nl/wetgeving/wat-verplicht" target="_blank" rel="noopener noreferrer"
        >Tijdelijk besluit digitale toegankelijkheid</a
      ></em
    >
    van toepassing. Dit betekent dat elke overheidswebsite aan de digitale toegankelijkheidseisen moet voldoen. De
    website van
    <a href="https://www.digitoegankelijk.nl" target="_blank" rel="noopener noreferrer">digitoegankelijk.nl</a> legt uit
    waarom dit zo belangrijk is:
  </p>
  <blockquote>
    <p>
      Ieder mens heeft het recht om te leven als ieder ander en mee te doen in de maatschappij. Gebruikmaken van de
      mogelijkheden die het internet, computers en smartphones ons bieden hoort daar natuurlijk bij. Juist daarom is het
      belangrijk dat digitale dienstverlening toegankelijk is voor iedereen.
    </p>
    <p>
      -- Bron:
      <em
        ><a
          href="https://www.digitoegankelijk.nl/aanpak/wat-is-digitale-toegankelijkheid"
          target="_blank"
          rel="noopener noreferrer"
          >Wat is digitale toegankelijkheid?</a
        ></em
      >
    </p>
  </blockquote>
  <p>
    De eisen van digitale toegankelijkheid zijn de
    <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer"
      >Web Content Accessibility Guidelines (WCAG) versie 2.1</a
    >. Digitale toegankelijkheid omvat veel verschillende onderwerpen: Kleur, typografie, lay-out en code. De beste
    manier om de digitale toegankelijkheid te borgen binnen een team is door de verantwoordelijkheid te delen en samen
    een toegankelijk platform neer te zetten.
  </p>
  <p>
    In de toolkit is er documentatie (bij enkele componenten nog in ontwikkeling) waar uitleg en hulp wordt gegeven per
    component om te helpen bij het voldoen aan de eisen en richtlijnen van de digitale toegankelijkheid.
  </p>
  <h2 class="anchor anchorWithStickyNavbar_JmGV" id="disclaimer">
    Disclaimer<a
      href="#disclaimer"
      class="hash-link"
      aria-label="Direct link naar Disclaimer"
      title="Direct link naar Disclaimer"
      >&ZeroWidthSpace;</a
    >
  </h2>
  <p>
    De DSO Toolkit is bedoeld voor gebruik binnen het programma Aan de slag met de Omgevingswet. Het is daarom niet
    toegestaan dat derden - zonder voorafgaande schriftelijke toestemming van het programma Aan de slag met de
    Omgevingswet - de informatie en/of de huisstijl kopiëren, vermenigvuldigen, bewerken of doorleveren anders dan voor
    persoonlijk, niet-commercieel gebruik.
  </p>
`;
