import * as React from "react";

import { Templates } from "../../templates";

export const defaultContent = (
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
      informatievoorziening wordt vereenvoudigd. In het Omgevingsloket vindt u digitale informatie over de fysieke
      leefomgeving. U kunt hier checken of u uw werkzaamheden mag uitvoeren volgens de Omgevingswet. En of u daarvoor
      een vergunning nodig hebt, een melding moet doen of informatie moet geven. Ook kunt u de regels bekijken die op
      een bepaalde locatie gelden. En checken aan welke maatregelen u zich moet houden bij uw werkzaamheden. In Mijn
      Omgevingsloket vindt u al uw aanvragen en meldingen terug. In het Omgevingsloket vindt u digitale informatie over
      de fysieke leefomgeving. U kunt hier checken of u uw werkzaamheden mag uitvoeren volgens de Omgevingswet. En of u
      daarvoor een vergunning nodig hebt, een melding moet doen of informatie moet geven. Ook kunt u de regels bekijken
      die op een bepaalde locatie gelden. En checken aan welke maatregelen u zich moet houden bij uw werkzaamheden. In
      Mijn Omgevingsloket vindt u al uw aanvragen en meldingen terug.
    </p>
  </div>
);

export function dynamicContent({ accordionTemplate }: Templates) {
  return (
    <>
      <div>
        <p>
          De Omgevingswet bundelt en vereenvoudigt de regels voor de fysieke leefomgeving in Nederland. Met deze wet
          worden 26 bestaande wetten samengevoegd, waardoor procedures voor ruimtelijke projecten overzichtelijker en
          efficiënter worden. Via het Omgevingsloket kunnen burgers en bedrijven vergunningen aanvragen, meldingen doen
          en informatie vinden over geldende regels op specifieke locaties. De wet stimuleert integrale besluitvorming
          en biedt ruimte voor maatwerk door gemeenten, provincies en waterschappen. Door de invoering van het Digitaal
          Stelsel Omgevingswet (DSO) wordt het eenvoudiger om relevante informatie te vinden en aanvragen digitaal in te
          dienen. Deze modernisering draagt bij aan een transparanter en toegankelijker omgevingsbeleid voor alle
          betrokkenen. Het Omgevingsloket is een gezamenlijk initiatief van het Ministerie van Volkshuisvesting en
          Ruimtelijke Ordening (VRO), gemeenten, provincies en waterschappen. Hier kunnen gebruikers vergunningaanvragen
          indienen, meldingen doen en informatie opvragen over de fysieke leefomgeving. Het loket biedt een centrale
          toegang tot regels en beleidsdocumenten die van toepassing zijn op specifieke locaties, waardoor het proces
          van vergunningverlening en informatievoorziening wordt vereenvoudigd.
        </p>
      </div>
      {accordionTemplate({
        variant: "compact",
        sections: [
          {
            handleTitle: "Klap Open",
            heading: "h4",
            content: (
              <div>
                <p>
                  In de functie 'Regels op de kaart' binnen het Omgevingsloket kunnen gebruikers eenvoudig regels en
                  beleidsdocumenten van alle overheden vinden die gelden op een specifieke locatie. Door een plek op de
                  kaart te selecteren, worden direct de relevante regels en documenten weergegeven. Deze interactieve
                  weergave helpt burgers en bedrijven om inzicht te krijgen in de regelgeving die van toepassing is op
                  hun plannen of activiteiten. Meer informatie is te vinden op de officiële website van het
                  Omgevingsloket.
                </p>
              </div>
            ),
          },
        ],
      })}
    </>
  );
}
