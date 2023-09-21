import { storiesOfHighlightBox, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import coreReadme from "@dso-toolkit/core/src/components/highlight-box/readme.md?raw";
import cssReadme from "dso-toolkit/src/components/highlight-box/readme.md?raw";

import { templateContainer } from "../../templates";
import { html } from "lit-html";

storiesOfHighlightBox({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ anchorTemplate, buttonTemplate, highlightBoxTemplate, richContentTemplate }) => ({
    highlightBoxTemplate,
    content: richContentTemplate({
      children: html`
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
          De ${anchorTemplate({ label: "Bouwregelgeving", url: "#", mode: "download" })} is een database met alle
          bouwregelgeving in Nederland, die op zodanige wijze moet zijn ingericht en ontsloten dat die voldoet aan de
          eisen van de Omgevingswet (3B's), en daarmee bruikbaar is in de ontwerp- en toetsingsfase van ieder bouwwerk.
        </p>
        <p>
          Het derde informatieproduct zijn de Vergunningvrije bouwwerken, hierin zijn opgenomen de (bekende) bouwwerken
          die vergunningvrij, maar niet regelvrij, zijn gerealiseerd. Het vierde en vooralsnog laatste informatieproduct
          is de Digitaliseringshulp, een service voor het centraal en gestandaardiseerd digitaliseren van documenten.
        </p>
        <div class="dso-button-row">
          ${buttonTemplate({ variant: "primary", label: "Primaire button", url: "#" })}
          ${buttonTemplate({ variant: "secondary", label: "Secundaire button", url: "#" })}
          ${buttonTemplate({
            variant: "tertiary",
            label: "Tertiare button",
            icon: { icon: "chevron-down" },
            iconMode: "after",
            url: "#",
          })}
        </div>
      `,
    }),
  }),
});

storiesOfHighlightBox({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ anchorTemplate, buttonTemplate, highlightBoxTemplate, richContentTemplate }) => ({
    highlightBoxTemplate,
    content: richContentTemplate({
      children: html`
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
          De ${anchorTemplate({ label: "Bouwregelgeving", url: "#", mode: "download" })} is een database met alle
          bouwregelgeving in Nederland, die op zodanige wijze moet zijn ingericht en ontsloten dat die voldoet aan de
          eisen van de Omgevingswet (3B's), en daarmee bruikbaar is in de ontwerp- en toetsingsfase van ieder bouwwerk.
        </p>
        <p>
          Het derde informatieproduct zijn de Vergunningvrije bouwwerken, hierin zijn opgenomen de (bekende) bouwwerken
          die vergunningvrij, maar niet regelvrij, zijn gerealiseerd. Het vierde en vooralsnog laatste informatieproduct
          is de Digitaliseringshulp, een service voor het centraal en gestandaardiseerd digitaliseren van documenten.
        </p>
        <div class="dso-button-row">
          ${buttonTemplate({ variant: "primary", label: "Primaire button", url: "#" })}
          ${buttonTemplate({ variant: "secondary", label: "Secundaire button", url: "#" })}
          ${buttonTemplate({
            variant: "tertiary",
            label: "Tertiare button",
            icon: { icon: "chevron-down" },
            iconMode: "after",
            url: "#",
          })}
        </div>
      `,
    }),
  }),
});
