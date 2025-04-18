import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";

export function content(): StoryFnAngularReturnType {
  return {
    template: `
      <div class="dso-rich-content">
        <h3>Toelichting: Vergunningvrij onder voorbehoud</h3>
        <p>
          Het Informatiehuis Bouw kent, op basis van de huidige gebruikerswensen, vier Informatieproducten, namelijk het
          Opleverdossier, de Bouwregelgeving, de Vergunningvrije bouwwerken en een Digitaliseringshulp.
        </p>
        <p>
          Het Opleverdossier (zie voor een nadere omschrijving van de informatieproducten de volgende paragrafen) is de,
          door gebruikers gewenste, centrale registratie waarin alle informatie over een bouwwerk is opgenomen. Het gaat
          hierbij om de tekeningen, berekeningen en de resultaten van de kwaliteitsborging (zoals toetsen en
          inspecties).
        </p>
        <p>
          De <a href="#" class="download">Bouwregelgeving</a> is een database met alle bouwregelgeving in Nederland, die op zodanige
          wijze moet zijn ingericht en ontsloten dat die voldoet aan de eisen van de Omgevingswet (3B's), en daarmee
          bruikbaar is in de ontwerp- en toetsingsfase van ieder bouwwerk.
        </p>
        <p>
          Het derde informatieproduct zijn de Vergunningvrije bouwwerken, hierin zijn opgenomen de (bekende) bouwwerken
          die vergunningvrij, maar niet regelvrij, zijn gerealiseerd. Het vierde en vooralsnog laatste informatieproduct
          is de Digitaliseringshulp, een service voor het centraal en gestandaardiseerd digitaliseren van documenten.
        </p>
        <div class="dso-button-row">
          <a href="#" class="dso-primary">
            <span>Primaire button</span>
          </a>
          <a href="#" class="dso-secondary">
            <span>Secundaire button</span>
          </a>
          <a href="#" class="dso-tertiary">
            <span>Tertiaire button</span>
            <dso-icon icon="chevron-down"></dso-icon>
          </a>
          <a href="#" class="dso-primary extern">
            <span>Externe primary button</span>
          </a>
          <a href="#" class="dso-secondary download">
            <span>Download secondary button</span>
          </a>
          <a href="#" class="dso-tertiary extern">
            <span>Externe tertiary button</span>
          </a>
        </div>
      </div>
    `,
  };
}
