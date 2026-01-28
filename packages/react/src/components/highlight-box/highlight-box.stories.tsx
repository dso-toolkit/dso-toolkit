import type { Meta } from "@storybook/react-vite";
import { HighlightBoxArgs, HighlightBoxColor, highlightBoxMeta, highlightBoxStories } from "dso-toolkit";
import * as React from "react";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta<HighlightBoxArgs> = {
  ...highlightBoxMeta({ readme }),
  title: "Highlight Box",
  args: {
    color: HighlightBoxColor.grey,
  },
};

export default meta;

const { Default, Yellow, Green, WhiteWithDropshadow, WithBorder, WithIcon, WithBannerImage } = highlightBoxStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { highlightBoxTemplate, iconTemplate } = templates;

    return {
      highlightBoxTemplate,
      content: (
        <>
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
            De
            <a href="#" className="download">
              Bouwregelgeving
            </a>
            is een database met alle bouwregelgeving in Nederland, die op zodanige wijze moet zijn ingericht en
            ontsloten dat die voldoet aan de eisen van de Omgevingswet (3B's), en daarmee bruikbaar is in de ontwerp- en
            toetsingsfase van ieder bouwwerk.
          </p>
          <p>
            Het derde informatieproduct zijn de Vergunningvrije bouwwerken, hierin zijn opgenomen de (bekende)
            bouwwerken die vergunningvrij, maar niet regelvrij, zijn gerealiseerd. Het vierde en vooralsnog laatste
            informatieproduct is de Digitaliseringshulp, een service voor het centraal en gestandaardiseerd
            digitaliseren van documenten.
          </p>
          <div className="dso-button-row">
            <a href="#" className="dso-primary">
              <span>Primaire button</span>
            </a>
            <a href="#" className="dso-secondary">
              <span>Secundaire button</span>
            </a>
            <a href="#" className="dso-tertiary">
              <span>Tertiaire button</span>
              {iconTemplate({ icon: "chevron-down" })}
            </a>
            <a href="#" className="dso-primary extern">
              <span>Primary extern anchor</span>
            </a>
            <a href="#" className="dso-secondary download">
              <span>Secondary download anchor</span>
            </a>
            <a href="#" className="dso-tertiary extern">
              <span>Tertiary extern anchor</span>
            </a>
          </div>
        </>
      ),
    };
  },
});

export { Default, Green, WhiteWithDropshadow, WithBannerImage, WithBorder, WithIcon, Yellow };
