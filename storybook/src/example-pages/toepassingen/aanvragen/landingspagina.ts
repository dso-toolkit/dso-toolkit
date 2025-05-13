import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { header } from "../../content/header.content";
import { mainMenu } from "../../content/main-menu.content";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Aanvragen",
  "Landingspagina",
  ({ linkTemplate, buttonTemplate, highlightBoxTemplate, richContentTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu("Aanvragen") })}
      <main>
        <div
          class="row dso-banner dso-banner-implementation-specific-image"
          style="background-image: url('images/hands-on-trackpad.jpg')"
        >
          <div class="col-lg-6 col-sm-8">
            ${highlightBoxTemplate({
              white: true,
              content: richContentTemplate({
                children: html`
                  <h1>Direct een aanvraag of melding indienen</h1>
                  <p>
                    De Bouwregelgeving is een database met alle bouwregelgeving in Nederland, die op zodanige wijze moet
                    zijn ingericht en ontsloten dat die voldoet aan de eisen van de Omgevingswet (3B's), en daarmee
                    bruikbaar is in de ontwerp- en toetsingsfase van ieder bouwwerk.
                  </p>
                  <p>${linkTemplate({ label: "Start met aanvragen", url: "#", modifier: "dso-primary" })}</p>
                `,
              }),
            })}
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8">
            ${highlightBoxTemplate({
              yellow: true,
              content: richContentTemplate({
                children: html`
                  <h2>Vul uw aanvraag zo compleet mogelijk in</h2>
                  <p>
                    Zo voorkomt u dat uw aanvraag vertraging oploopt. Er zijn weinig vragen verplicht. Om uw aanvraag in
                    behandeling te kunnen nemen moeten wel voldoende gegevens toegevoegd zijn. Welke dat zijn is in elke
                    situatie anders. Vul daarom zoveel mogelijk in.
                  </p>
                  <h3>Kosten</h3>
                  <p>
                    De kosten van een aanvraag zijn verschillend. Kijk op de website van uw gemeente, waterschap of
                    provincie voor de precieze kosten.
                  </p>
                `,
              }),
            })}
            ${richContentTemplate({
              children: html`
                <h2>Omgevingsoverleg</h2>
                <p>
                  Is uw plan erg ingewikkeld? Dan adviseren we u een aanvraag te doen voor een Omgevingsoverleg. Het
                  Omgevingsoverleg is een zorgvuldig proces waarin u uw plan bespreekt samen met uw gemeente, waterschap
                  of provincie en andere relevante betrokkenen. Het uitgangspunt van het Omgevingsoverleg is 'Hoe kunnen
                  we dit plan mogelijk maken?'. Na het Omgevingsoverleg weet u of uw project haalbaar is. Ook weet u hoe
                  u uw verzoek het beste kunt indienen.
                </p>
                <p>
                  <em class="text-muted"
                    >Let op, bekijk altijd eerst de website van uw gemeente, waterschap of provincie voor
                    beschikbaarheid en mogelijke kosten van een Omgevingsoverleg</em
                  >
                </p>
                <h2>Eerst een vergunningcheck?</h2>
                <p>
                  Weet u niet goed uit welke activiteiten uw project bestaat? Doe dan eerst een Vergunningcheck. U kunt
                  vanuit de Vergunningcheck een aanvraag klaar zetten. Dan worden uw locatie en activiteiten bewaard.
                  Dat scheelt u veel werk in de toekomst. Start
                  ${linkTemplate({ label: "de Vergunningscheck", url: "#" })}.
                </p>
              `,
            })}
          </div>
          <div class="col-lg-4">
            ${highlightBoxTemplate({
              border: true,
              white: true,
              content: richContentTemplate({
                children: html`
                  <h2>Vragen?</h2>
                  <p>
                    Heeft u vragen over uw vergunning of melding? Neem dan contact op met uw gemeente of waterschap.
                    Heeft u vragen over hoe de website werkt? Neem dan contact op met
                    ${linkTemplate({ label: "het Informatiepunt", url: "#", mode: "extern" })}.
                  </p>
                `,
              }),
            })}
          </div>
        </div>
        <div class="row dso-featured">
          <div class="col-xs-12">
            <h2>De stappen</h2>
            <ol class="row dso-equal-heights">
              <li class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  step: 1,
                  content: richContentTemplate({
                    children: html`
                      <h3>Project aanmaken</h3>
                      <p>
                        Maak eerst een project aan. Deze vindt u daarna terug in
                        ${linkTemplate({ label: "Mijn omgevingsloket", url: "#" })}.
                      </p>
                    `,
                  }),
                })}
              </li>
              <li class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  step: 2,
                  content: richContentTemplate({
                    children: html`
                      <h3>Locatie</h3>
                      <p>Kies de locatie voor uw bouwactiviteit(en).</p>
                    `,
                  }),
                })}
              </li>
              <li class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  step: 3,
                  content: richContentTemplate({
                    children: html`
                      <h3>Activiteiten</h3>
                      <p>Kies de activiteiten van uw project.</p>
                    `,
                  }),
                })}
              </li>
              <li class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  step: 4,
                  content: richContentTemplate({
                    children: html`
                      <h3>Vragen beantwoorden</h3>
                      <p>
                        Beantwoord alle vragen die nodig zijn voor uw aanvraag. Vragen die in uw situatie niet meer
                        relevant zijn vallen vanzelf weg.
                      </p>
                    `,
                  }),
                })}
              </li>
              <li class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  step: 5,
                  content: richContentTemplate({
                    children: html`
                      <h3>Documenten toevoegen</h3>
                      <p>Voeg alle benodigde documenten toe.</p>
                    `,
                  }),
                })}
              </li>
              <li class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  step: 6,
                  content: richContentTemplate({
                    children: html`
                      <h3>Uw gegevens</h3>
                      <p>Controleer uw gegevens en vul aan waar nodig.</p>
                    `,
                  }),
                })}
              </li>
              <li class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  step: 7,
                  content: richContentTemplate({
                    children: html`
                      <h3>Verzoek samenstellen</h3>
                      <p>
                        In de laatste stap bepaalt u voor welke activiteit(en) een Omgevingsoverleg of definitief
                        verzoek wordt verstuurd.
                      </p>
                    `,
                  }),
                })}
              </li>
            </ol>
          </div>
        </div>
        <div class="row dso-equal-heights">
          <div class="col-xs-12">
            <h2>Wat gebeurt er nadat mijn verzoek is verstuurd?</h2>
          </div>
          <div class="col-sm-4">
            ${highlightBoxTemplate({
              white: true,
              dropShadow: true,
              content: richContentTemplate({
                children: html`
                  <h3>Besluitperiode</h3>
                  <p>
                    U ontvangt een bericht van de organisatie die uw verzoek behandeld. Meestal ontvangt u binnen 8
                    weken een besluit van de behandelende organisatie.
                  </p>
                `,
              }),
            })}
          </div>
          <div class="col-sm-4">
            ${highlightBoxTemplate({
              white: true,
              dropShadow: true,
              content: richContentTemplate({
                children: html`
                  <h3>Aanvullen verzoek</h3>
                  <p>
                    Als er iets mist of niet klopt wordt u gevraagd het verzoek aan te vullen. Dit kan in
                    ${linkTemplate({ label: "Mijn Omgevingsloket", url: "#" })}. De periode waarin er een besluit
                    genomen wordt kan worden verlengd.
                  </p>
                `,
              }),
            })}
          </div>
          <div class="col-sm-4">
            ${highlightBoxTemplate({
              white: true,
              dropShadow: true,
              content: richContentTemplate({
                children: html`
                  <h3>Bezwaar en beroep</h3>
                  <p>
                    Na het besluit hebben u én andere betrokkenen 6 weken de tijd om bezwaar te maken. Het is verstandig
                    om deze tijd te wachten met het uitvoeren van de werkzaamheden.
                  </p>
                `,
              }),
            })}
          </div>
        </div>
        <div class="row">
          <div class="text-center">
            <h2>Klaar om uw aanvraag te starten?</h2>
            ${buttonTemplate({ label: "Start aanvraag", variant: "primary", type: "button" })}
          </div>
        </div>
      </main>
      ${footerPartial(templates)}
    </div>
  `,
);
