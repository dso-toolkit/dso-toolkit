import readme from "@dso-toolkit/core/src/components/highlight-box/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { TemplateResult, html } from "lit-html";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";
import { buttonTemplate } from "../button/button.template.js";
import { linkTemplate } from "../link/link.template.js";
import { richContentTemplate } from "../rich-content/rich-content.template.js";

import { HighlightBoxArgs, highlightBoxArgTypes, highlightBoxArgsMapper } from "./highlight-box.args.js";
import { highlightBoxTemplate } from "./highlight-box.template.js";

type HighlightBoxStory = StoryObj<HighlightBoxArgs, Renderer>;

const meta: Meta<HighlightBoxArgs> = {
  title: "Core/Highlight Box",
  argTypes: highlightBoxArgTypes,
  args: {
    yellow: false,
    white: false,
    border: false,
    dropShadow: false,
    bannerImage: false,
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

function createContent(heading: TemplateResult) {
  return richContentTemplate({
    children: html`
      ${heading}
      <p>
        Het Informatiehuis Bouw kent, op basis van de huidige gebruikerswensen, vier Informatieproducten, namelijk het
        Opleverdossier, de Bouwregelgeving, de Vergunningvrije bouwwerken en een Digitaliseringshulp.
      </p>
      <p>
        Het Opleverdossier (zie voor een nadere omschrijving van de informatieproducten de volgende paragrafen) is de,
        door gebruikers gewenste, centrale registratie waarin alle informatie over een bouwwerk is opgenomen. Het gaat
        hierbij om de tekeningen, berekeningen en de resultaten van de kwaliteitsborging (zoals toetsen en inspecties).
      </p>
      <p>
        De ${linkTemplate({ label: "Bouwregelgeving", url: "#", mode: "download" })} is een database met alle
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
        ${buttonTemplate({
          variant: "primary",
          label: "Primary extern anchor",
          mode: "extern",
          url: "#",
        })}
        ${buttonTemplate({
          variant: "secondary",
          label: "Secondary download anchor",
          mode: "download",
          url: "#",
        })}
        ${buttonTemplate({
          variant: "tertiary",
          label: "Tertiary extern anchor",
          mode: "extern",
          url: "#",
        })}
      </div>
    `,
  });
}

const content = createContent(html`<h3>Toelichting: Vergunningvrij onder voorbehoud</h3>`);
const stepContent = createContent(
  html`<h3><span class="sr-only">Stap x van y: </span>Toelichting: Vergunningvrij onder voorbehoud</h3>`,
);
const render = (args: HighlightBoxArgs) => highlightBoxTemplate(highlightBoxArgsMapper(args, content, stepContent));

export const Default: HighlightBoxStory = { render };
export const Yellow: HighlightBoxStory = { args: { yellow: true }, render };
export const Green: HighlightBoxStory = { args: { green: true }, render };
export const Grey: HighlightBoxStory = { args: { grey: true }, render };
export const GreyWithBorder: HighlightBoxStory = { args: { grey: true, border: true }, render };
export const WhiteWithDropshadow: HighlightBoxStory = { args: { white: true, dropShadow: true }, render };
export const WithBorder: HighlightBoxStory = { args: { border: true }, render };
export const WithIcon: HighlightBoxStory = { args: { yellow: true, icon: "plus" }, render };
export const WithBannerImage: HighlightBoxStory = { args: { bannerImage: true }, render };
