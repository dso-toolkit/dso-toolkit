import type { Meta } from "@storybook/web-components-vite";
import { ShoppingCartItem, argTypeAction } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { HandlerFunction } from "storybook/actions";
import { fn } from "storybook/test";

import { examplePageStories } from "../../example-page-stories";

const meta: Meta = {
  title: "Patronen/Shopping Cart",
  tags: ["!autodocs"],
};

export default meta;

type ShoppingCartBlockArgs = {
  shoppingCartItemDsoEdit: HandlerFunction;
  shoppingCartItemDsoDelete: HandlerFunction;
  shoppingCartItemDsoClose: HandlerFunction;
  formDsoSubmit: HandlerFunction;
};

type ShoppingCartOverlayArgs = {
  mode: "side" | "main";
  gridColumnDsoClose: HandlerFunction;
  shoppingCartDsoToggle: HandlerFunction;
} & ShoppingCartBlockArgs;

export const Block = examplePageStories<ShoppingCartBlockArgs>(
  (templates, { shoppingCartItemDsoEdit, shoppingCartItemDsoDelete, shoppingCartItemDsoClose, formDsoSubmit }) => {
    const { shoppingCartTemplate } = templates;

    const items: ShoppingCartItem<TemplateResult>[] = [
      {
        mode: "edit",
        label: "Toevoeging bij activiteitnaam veranderen",
        form: {
          content: [
            {
              group: "static",
              id: "activiteitnaam",
              label: "Activiteitnaam",
              value:
                "Ontgraven, verplaatsen of toepassen van grond of baggerspecie in of bij een oppervlaktewaterlichaam, niet zijnde de Noordzee, of waterkering in beheer bij het Rijk",
            },
            {
              group: "input",
              id: "toevoeging",
              type: "text",
              label: "Toevoeging",
              formButtons: {
                buttons: [
                  {
                    type: "submit",
                    label: "Opslaan",
                    variant: "primary",
                    compact: true,
                  },
                ],
              },
            },
          ],
          dsoSubmit: (event) => {
            event.preventDefault();
            formDsoSubmit(event);
          },
        },
        dsoClose: shoppingCartItemDsoClose,
      },
      {
        label:
          "Ontgraven, verplaatsen of toepassen van grond of baggerspecie in of bij een oppervlaktewaterlichaam, niet zijnde de Noordzee, of waterkering in beheer bij het Rijk",
        info: "Aanvraag vergunning (Gemeente Woerden)",
        warning: true,
        editable: true,
        removable: true,
        subitems: [
          {
            label: "Afscheiding tussen balkons of dakterrassen plaatsen of vervangen",
            warning: true,
          },
        ],
        dsoEdit: shoppingCartItemDsoEdit,
        dsoDelete: shoppingCartItemDsoDelete,
      },
      {
        label: "Verspreiding Aziatische duizendknoopsoorten voorkomen (1)",
        info: "Melding (gemeente Woerden)",
        editable: true,
        removable: true,
        dsoEdit: shoppingCartItemDsoEdit,
        dsoDelete: shoppingCartItemDsoDelete,
      },
      {
        label: "Graven in bodem met een kwaliteit onder of gelijk aan de interventiewaarde bodemkwaliteit",
        info: "Informatie",
        editable: true,
        removable: true,
        dsoEdit: shoppingCartItemDsoEdit,
        dsoDelete: shoppingCartItemDsoDelete,
      },
    ];

    return html`
      <div class="container">
        <main>
          <h1>Overzicht van uw werkzaamheden</h1>
          <p>
            De Shopping Cart staat hier als zelfstandig component in de lopende content, over de volle breedte. Dit is
            de main-variant zonder overlay en zonder toggle-knop, zoals op een overzichtspagina waarin u uw selectie
            bekijkt. De item-acties en het sluiten van het formulier zie je terug in het Actions-panel.
          </p>

          <div class="row">
            <div class="col-xs-12">
              ${shoppingCartTemplate({
                mode: "main",
                title: "Gekozen activiteiten",
                items,
              })}
            </div>
          </div>
        </main>
      </div>
    `;
  },
  {
    argTypes: {
      shoppingCartItemDsoEdit: argTypeAction(),
      shoppingCartItemDsoDelete: argTypeAction(),
      shoppingCartItemDsoClose: argTypeAction(),
      formDsoSubmit: argTypeAction(),
    },
    args: {
      shoppingCartItemDsoEdit: fn(),
      shoppingCartItemDsoDelete: fn(),
      shoppingCartItemDsoClose: fn(),
      formDsoSubmit: fn(),
    },
  },
);

export const Overlay = examplePageStories<ShoppingCartOverlayArgs>(
  (
    templates,
    {
      mode,
      gridColumnDsoClose,
      shoppingCartDsoToggle,
      shoppingCartItemDsoEdit,
      shoppingCartItemDsoDelete,
      shoppingCartItemDsoClose,
      formDsoSubmit,
    },
  ) => {
    const { gridColumnTemplate, shoppingCartTemplate } = templates;

    const sideItems: ShoppingCartItem<TemplateResult>[] = [
      {
        label: "Ontgraven, verplaatsen of toepassen van grond of baggerspecie in of bij een oppervlaktewaterlichaam",
        info: "Aanvraag vergunning (Gemeente Utrecht)",
        warning: true,
        removable: true,
        subitems: [
          {
            label: "Afscheiding tussen balkons of dakterrassen plaatsen of vervangen",
            warning: true,
          },
        ],
        dsoDelete: shoppingCartItemDsoDelete,
      },
      {
        label: "Flora- en fauna-activiteit",
        info: "Aanvraag vergunning",
        removable: true,
        dsoDelete: shoppingCartItemDsoDelete,
      },
      {
        label: "Verspreiding Aziatische duizendknoopsoorten voorkomen",
        info: "Melding (gemeente Woerden) - 2x",
        removable: true,
        dsoDelete: shoppingCartItemDsoDelete,
      },
    ];

    const mainItems: ShoppingCartItem<TemplateResult>[] = [
      {
        mode: "edit",
        label: "Toevoeging bij activiteitnaam veranderen",
        form: {
          content: [
            {
              group: "static",
              id: "activiteitnaam",
              label: "Activiteitnaam",
              value:
                "Ontgraven, verplaatsen of toepassen van grond of baggerspecie in of bij een oppervlaktewaterlichaam, niet zijnde de Noordzee, of waterkering in beheer bij het Rijk",
            },
            {
              group: "input",
              id: "toevoeging",
              type: "text",
              label: "Toevoeging",
              formButtons: {
                buttons: [
                  {
                    type: "submit",
                    label: "Opslaan",
                    variant: "primary",
                    compact: true,
                  },
                ],
              },
            },
          ],
          dsoSubmit: (event) => {
            event.preventDefault();
            formDsoSubmit(event);
          },
        },
        dsoClose: shoppingCartItemDsoClose,
      },
      {
        label:
          "Ontgraven, verplaatsen of toepassen van grond of baggerspecie in of bij een oppervlaktewaterlichaam, niet zijnde de Noordzee, of waterkering in beheer bij het Rijk",
        info: "Aanvraag vergunning (Gemeente Woerden)",
        warning: true,
        editable: true,
        removable: true,
        subitems: [
          {
            label: "Afscheiding tussen balkons of dakterrassen plaatsen of vervangen",
            warning: true,
          },
        ],
        dsoEdit: shoppingCartItemDsoEdit,
        dsoDelete: shoppingCartItemDsoDelete,
      },
      {
        label: "Verspreiding Aziatische duizendknoopsoorten voorkomen (1)",
        info: "Melding (gemeente Woerden)",
        editable: true,
        removable: true,
        dsoEdit: shoppingCartItemDsoEdit,
        dsoDelete: shoppingCartItemDsoDelete,
      },
      {
        label: "Graven in bodem met een kwaliteit onder of gelijk aan de interventiewaarde bodemkwaliteit",
        info: "Informatie",
        editable: true,
        removable: true,
        dsoEdit: shoppingCartItemDsoEdit,
        dsoDelete: shoppingCartItemDsoDelete,
      },
    ];

    return html`
      <div class="container">
        <main>
          <h1>Shopping Cart Overlay</h1>
          <p>
            De Shopping Cart staat als side-variant rechts in beeld over 4 kolommen. Met de <code>mode</code>-control
            wissel je naar de main-variant: de Grid Column zet dan zijn overlay-modus aan en het paneel rekt op tot de
            volledige rij. Alle events zijn aangesloten; de toggle-knop, de item-acties, een klik op de backdrop en
            Escape zie je terug in het Actions-panel. Onder de sm-grens doet de overlay niets en wisselt de cart in de
            flow van modus; mobiele ondersteuning is nog geen scope.
          </p>

          <div class="row">
            <div class="col-xs-12 col-sm-8">
              <h2>Waar gaan de werkzaamheden plaatsvinden?</h2>
              <p>
                Kies de werkzaamheden die u wilt uitvoeren. De gekozen werkzaamheden staan rechts in het overzicht.
                Vanuit het overzicht kunt u werkzaamheden bekijken, veranderen of verwijderen.
              </p>
              <p>
                Sommige werkzaamheden hebben een toevoeging nodig, bijvoorbeeld de plaats op het perceel. U kunt de
                toevoeging veranderen via het potlood-icoon bij de werkzaamheid.
              </p>
              <h2>Hoe kiest u de juiste werkzaamheden?</h2>
              <p>
                Zoek op trefwoord of blader door de lijst met werkzaamheden. Twijfelt u tussen twee werkzaamheden, lees
                dan de toelichting bij elke werkzaamheid. Daarin staat voor welke situaties de werkzaamheid bedoeld is
                en welke regels erbij horen.
              </p>
              <p>
                Voor sommige werkzaamheden geldt een meldplicht, voor andere een vergunningplicht. Dat verschil ziet u
                terug in het overzicht: bij elke gekozen werkzaamheid staat of het om een melding of om een aanvraag
                gaat. Bij een waarschuwingsteken is er iets dat uw aandacht vraagt, bijvoorbeeld een ontbrekende
                toevoeging.
              </p>
              <h2>Wat gebeurt er daarna?</h2>
              <p>
                Als u alle werkzaamheden heeft gekozen, gaat u verder naar de vragen. Per werkzaamheid krijgt u alleen
                de vragen die voor uw situatie gelden. De antwoorden bepalen welke regels van toepassing zijn en welke
                gegevens u moet aanleveren.
              </p>
              <p>
                U kunt tussendoor altijd terug naar dit overzicht om werkzaamheden toe te voegen of te verwijderen. Uw
                antwoorden blijven bewaard zolang de werkzaamheid in het overzicht staat. Verwijdert u een werkzaamheid,
                dan vervallen ook de bijbehorende antwoorden.
              </p>
              <h2>Werkzaamheden op meerdere locaties</h2>
              <p>
                Voert u dezelfde werkzaamheid uit op meerdere locaties, dan kiest u de werkzaamheid per locatie opnieuw.
                In het overzicht ziet u dan achter de naam hoe vaak u de werkzaamheid heeft gekozen. Zo houdt u per
                locatie overzicht over de vragen en de gegevens die u moet aanleveren.
              </p>
              <p>
                Grenst uw project aan een ander perceel of aan water, dan kan het zijn dat er extra regels gelden.
                Controleer in dat geval ook de regels van het waterschap en de provincie. Het overzicht laat per
                werkzaamheid zien welke overheid de melding of aanvraag behandelt.
              </p>
              <h2>Samen indienen of los versturen</h2>
              <p>
                U kunt alle gekozen werkzaamheden in een keer indienen, of ze los van elkaar versturen. In een keer
                indienen is handig als de werkzaamheden bij elkaar horen, bijvoorbeeld bij een verbouwing waar meerdere
                vergunningen voor nodig zijn. De behandelende overheid ziet dan direct de samenhang tussen de
                onderdelen.
              </p>
              <p>
                Los versturen kan handig zijn als een deel van uw project al vaststaat en een ander deel nog niet. U
                dient dan eerst de werkzaamheden in die klaar zijn, en vult de rest later aan. Houd er rekening mee dat
                de behandeltermijnen per melding of aanvraag apart gaan lopen.
              </p>
              <h2>Hulp nodig?</h2>
              <p>
                Komt u er niet uit, dan kunt u de vergunningcheck opnieuw doen. De check stelt vragen over uw situatie
                en laat zien welke werkzaamheden daarbij horen. De uitkomst van de check kunt u meenemen naar dit
                overzicht, zodat u niet opnieuw hoeft te zoeken.
              </p>
              <p>
                U kunt ook contact opnemen met uw gemeente. Voor vragen over uw specifieke situatie, bijvoorbeeld over
                een monument of een beschermd stadsgezicht, is de gemeente het eerste aanspreekpunt. Zij kunnen u ook
                vertellen of een vooroverleg zinvol is voordat u de aanvraag indient.
              </p>
            </div>
            ${gridColumnTemplate({
              columns: "xs-12 sm-4",
              overlay: mode === "main",
              dsoClose: gridColumnDsoClose,
              content: shoppingCartTemplate({
                mode,
                toggleable: true,
                title: "Gekozen activiteiten",
                dsoToggle: shoppingCartDsoToggle,
                items: mode === "main" ? mainItems : sideItems,
              }),
            })}
          </div>
        </main>
      </div>
    `;
  },
  {
    argTypes: {
      mode: {
        options: ["side", "main"],
        control: {
          type: "radio",
        },
      },
      gridColumnDsoClose: argTypeAction(),
      shoppingCartDsoToggle: argTypeAction(),
      shoppingCartItemDsoEdit: argTypeAction(),
      shoppingCartItemDsoDelete: argTypeAction(),
      shoppingCartItemDsoClose: argTypeAction(),
      formDsoSubmit: argTypeAction(),
    },
    args: {
      mode: "main",
      gridColumnDsoClose: fn(),
      shoppingCartDsoToggle: fn(),
      shoppingCartItemDsoEdit: fn(),
      shoppingCartItemDsoDelete: fn(),
      shoppingCartItemDsoClose: fn(),
      formDsoSubmit: fn(),
    },
  },
);
