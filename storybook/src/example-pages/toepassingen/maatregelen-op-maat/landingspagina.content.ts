import { AccordionSection, HeaderMenuItem } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

export const mainMenu: HeaderMenuItem[] = [
  {
    label: "Home",
    url: "#",
  },
  {
    label: "Vergunningscheck",
    url: "#",
  },
  {
    label: "Aanvragen",
    url: "#",
  },
  {
    label: "Regels op de kaart",
    url: "#",
  },
  {
    label: "Maatregelen op maat",
    url: "#",
    active: true,
  },
];

export const accordionSections: AccordionSection<TemplateResult>[] = [
  {
    handleTitle: "Wat is maatregelen op maat?",
    heading: "h2",
  },
  {
    handleTitle: "Voor wie is Maatregelen op maat bedoeld?",
    heading: "h2",
  },
  {
    handleTitle: "Wat staat er in mijn overzicht van maatregelen op maat?",
    heading: "h2",
    open: true,
    content: html`
      <p>
        In uw overzicht staan alle maatregelen die u kunt nemen om u aan de regels te houden die gelden voor uw
        werkzaamheden. Deze maatregelen zijn gebaseerd op de wetten en regels die gelden voor deze werkzaamheden.
      </p>
    `,
  },
  {
    handleTitle: "Kan ik de rechten ontlenen aan de uitkomst van Maatregelen op maat?",
    heading: "h2",
  },
];
