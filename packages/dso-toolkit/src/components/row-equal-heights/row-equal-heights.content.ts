import { HighlightBox } from "../highlight-box/highlight-box.models.js";
import { Tile } from "../tile/tile.models.js";
import { Whitebox } from "../whitebox/whitebox.models.js";

export const highlightBoxes: HighlightBox<string>[] = [
  {
    yellow: false,
    white: false,
    border: false,
    dropShadow: false,
    step: 1,
    content:
      '<div class="dso-rich-content"><h2>Ongelijke inhoud</h2><p>Dit blok is hoger, dit blok heeft meer te vertellen omdat het een veel boeiender blok is. Mijn broertjes zijn minder interessant, dat zie je aan de inhoud.</p><p>PS: Ik ben het tweede blokje</p></div>',
  },
  {
    yellow: false,
    white: false,
    border: false,
    dropShadow: false,
    step: 2,
    content:
      '<div class="dso-rich-content"><h2>Ongelijke inhoud</h2><p>een <code>.row</code> een <code>.dso-equal-heights</code> krijgt, worden voor de volgende componenten de kolommen visueel even hoog:</p><ul><li>Highlight Box</li><li>Whitebox</li><li>Whitebox small</li></ul></div>',
  },
  {
    yellow: false,
    white: false,
    border: false,
    dropShadow: false,
    step: 3,
    content: '<div class="dso-rich-content"><h2>Ongelijke inhoud</h2><p>Oninteressant blokje</p></div>',
  },
  {
    yellow: false,
    white: false,
    border: false,
    dropShadow: false,
    step: 4,
    content: '<div class="dso-rich-content"><h2>Ongelijke inhoud</h2><p>Aha</p></div>',
  },
];

export const tiles: Tile[] = [
  {
    anchor: "#",
    label: "Kort verhaal",
    image: {
      alt: "",
      source: "images/icon-tree.png",
    },
  },
  {
    anchor: "#",
    label: "Lang verhaal waardoor dit blok hoger op je scherm wordt",
    image: {
      alt: "",
      source: "images/icon-tree.png",
    },
  },
  {
    anchor: "#",
    label: "Kort verhaal",
    image: {
      alt: "",
      source: "images/icon-tree.png",
    },
  },
  {
    anchor: "#",
    label: "Lang verhaal waardoor dit blok hoger op je scherm wordt",
    image: {
      alt: "",
      source: "images/icon-tree.png",
    },
  },
  {
    anchor: "#",
    label: "Kort verhaal",
    image: {
      alt: "",
      source: "images/icon-tree.png",
    },
  },
  {
    anchor: "#",
    label: "Lang verhaal waardoor dit blok hoger op je scherm wordt",
    image: {
      alt: "",
      source: "images/icon-tree.png",
    },
  },
];

export const whiteboxes: Whitebox[] = [
  {
    label: "Direct naar aanvragen",
    title: "Ik wil weten welke wetten en regels er gelden voor mijn huis/bedrijf.",
    description: "Weet u al voor welke activiteiten u een vergunning moet aanvragen of een melding moet doen?",
    image: {
      alt: "",
      source: "images/indienen.png",
    },
  },
  {
    label: "Direct naar aanvragen",
    title: "Ik wil weten welke wetten en regels er gelden voor mijn huis/bedrijf.",
    description:
      "Weet u al voor welke activiteiten u een vergunning moet aanvragen of een melding moet doen? Dan kunt u de aanvraag of melding direct indienen.",
    image: {
      alt: "",
      source: "images/indienen.png",
    },
  },
  {
    label: "Direct naar aanvragen",
    title: "Ik wil weten welke wetten en regels er gelden voor mijn huis/bedrijf.",
    description: "Weet u al voor welke activiteiten u een vergunning moet aanvragen of een melding moet doen?",
    image: {
      alt: "",
      source: "images/indienen.png",
    },
  },
];
