import { html } from "lit-html";

import { Templates } from "../../templates";

export const defaultContent = html`
  <div>
    <p>
      De Omgevingswet bundelt en vereenvoudigt de regels voor de fysieke leefomgeving in Nederland. Met deze wet worden
      26 bestaande wetten samengevoegd, waardoor procedures voor ruimtelijke projecten overzichtelijker en efficiënter
      worden. Via het Omgevingsloket kunnen burgers en bedrijven vergunningen aanvragen, meldingen doen en informatie
      vinden over geldende regels op specifieke locaties. De wet stimuleert integrale besluitvorming en biedt ruimte
      voor maatwerk door gemeenten, provincies en waterschappen. Door de invoering van het Digitaal Stelsel Omgevingswet
      (DSO) wordt het eenvoudiger om relevante informatie te vinden en aanvragen digitaal in te dienen. Deze
      modernisering draagt bij aan een transparanter en toegankelijker omgevingsbeleid voor alle betrokkenen. Het
      Omgevingsloket is een gezamenlijk initiatief van het Ministerie van Volkshuisvesting en Ruimtelijke Ordening
      (VRO), gemeenten, provincies en waterschappen. Hier kunnen gebruikers vergunningaanvragen indienen, meldingen doen
      en informatie opvragen over de fysieke leefomgeving. Het loket biedt een centrale toegang tot regels en
      beleidsdocumenten die van toepassing zijn op specifieke locaties, waardoor het proces van vergunningverlening en
      informatievoorziening wordt vereenvoudigd.
    </p>
  </div>
`;

export function dynamicContent({ accordionTemplate }: Templates) {
  return html`
    <div>
      <p>
        Het Omgevingsloket is een gezamenlijk initiatief van het Ministerie van Volkshuisvesting en Ruimtelijke Ordening
        (VRO), gemeenten, provincies en waterschappen. Hier kunnen gebruikers vergunningaanvragen indienen, meldingen
        doen en informatie opvragen over de fysieke leefomgeving.
      </p>
    </div>
    ${accordionTemplate({
      variant: "compact",
      sections: [
        {
          handleTitle: "Klap Open",
          heading: "h4",
          open: false,
          content: html`
            <div>
              <p>
                In de functie 'Regels op de kaart' binnen het Omgevingsloket kunnen gebruikers eenvoudig regels en
                beleidsdocumenten van alle overheden vinden die gelden op een specifieke locatie. Door een plek op de
                kaart te selecteren, worden direct de relevante regels en documenten weergegeven. Deze interactieve
                weergave helpt burgers en bedrijven om inzicht te krijgen in de regelgeving die van toepassing is op hun
                plannen of activiteiten. Meer informatie is te vinden op de officiële website van het Omgevingsloket.
              </p>
            </div>
          `,
        },
      ],
    })}
  `;
}
