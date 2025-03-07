import { Templates } from "../../templates";
import { html } from "lit-html";

const imageOverlayHtml = `<dso-image-overlay>
  <img
    src="images/canvas-home_iplo-min.png"
    alt="Een afbeelding"
    width="250"
  >
</dso-image-overlay>`;

export function defaultTable({ anchorTemplate }: Templates) {
  return {
    caption: "Overzicht van gebruikersnamen",
    head: [
      { label: "Nummer" },
      { label: "Voornaam" },
      { label: "Achternaam" },
      { label: "GitHub gebruikersnaam" },
      { label: "Modifier" },
      { label: "Een wat langere kolom" },
    ],
    rows: [
      [
        "1",
        anchorTemplate({ label: "Fabien", url: "#fabien" }),
        "Potencier",
        "fabpot",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "2",
        anchorTemplate({ label: "Andrew", url: "#andrew" }),
        "Nesbitt",
        "andrew",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "3",
        anchorTemplate({ label: "Taylor", url: "#taylor" }),
        "Otwell",
        "taylorotwell",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "4",
        anchorTemplate({ label: "Kitty", url: "#kitty" }),
        "Giraudel",
        "KittyGiraudel",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
    ],
  };
}

export function imageOverlayTable({ anchorTemplate }: Templates) {
  return {
    caption: "Overzicht van gebruikersnamen",
    head: [
      { label: "Nummer" },
      { label: "Voornaam" },
      { label: "Achternaam" },
      { label: "GitHub gebruikersnaam" },
      { label: "Modifier" },
      { label: "Een wat langere kolom" },
    ],
    rows: [
      ["1", anchorTemplate({ label: "Fabien", url: "#fabien" }), "Potencier", "fabpot", "<code>tr</code>", ""],
      [
        "2",
        anchorTemplate({ label: "Andrew", url: "#andrew" }),
        "Nesbitt",
        "andrew",
        "<code>tr</code>",
        imageOverlayHtml,
      ],
      ["3", anchorTemplate({ label: "Taylor", url: "#taylor" }), "Otwell", "taylorotwell", "<code>tr</code>", ""],
      ["4", anchorTemplate({ label: "Kitty", url: "#kitty" }), "Giraudel", "KittyGiraudel", "<code>tr</code>", ""],
    ],
  };
}

export function sortedAscendingTable({ anchorTemplate }: Templates) {
  return {
    caption: "Overzicht van gebruikersnamen",
    head: [
      { label: "Nummer", sortable: true, sorting: "ascending" },
      { label: "Voornaam", sortable: true },
      { label: "Achternaam", sortable: true },
      { label: "GitHub gebruikersnaam", sortable: true },
      { label: "Modifier", sortable: true },
      { label: "Een wat langere kolom", sortable: true },
    ],
    rows: [
      [
        "1",
        anchorTemplate({ label: "Fabien", url: "#fabien" }),
        "Potencier",
        "fabpot",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "2",
        anchorTemplate({ label: "Andrew", url: "#andrew" }),
        "Nesbitt",
        "andrew",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "3",
        anchorTemplate({ label: "Taylor", url: "#taylor" }),
        "Otwell",
        "taylorotwell",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "4",
        anchorTemplate({ label: "Kitty", url: "#kitty" }),
        "Giraudel",
        "KittyGiraudel",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
    ],
  };
}

export function sortedDescendingTable({ anchorTemplate }: Templates) {
  return {
    caption: "Overzicht van gebruikersnamen",
    head: [
      { label: "Nummer", sortable: true, sorting: "descending" },
      { label: "Voornaam", sortable: true },
      { label: "Achternaam", sortable: true },
      { label: "GitHub gebruikersnaam", sortable: true },
      { label: "Modifier", sortable: true },
      { label: "Een wat langere kolom", sortable: true },
    ],
    rows: [
      [
        "4",
        anchorTemplate({ label: "Kitty", url: "#kitty" }),
        "Giraudel",
        "KittyGiraudel",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "3",
        anchorTemplate({ label: "Taylor", url: "#taylor" }),
        "Otwell",
        "taylorotwell",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "2",
        anchorTemplate({ label: "Andrew", url: "#andrew" }),
        "Nesbitt",
        "andrew",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "1",
        anchorTemplate({ label: "Fabien", url: "#fabien" }),
        "Potencier",
        "fabpot",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
    ],
  };
}

function actionsTemplate({ buttonTemplate }: Templates) {
  return html`${buttonTemplate({
    type: "button",
    variant: "tertiary",
    label: "Bewerk",
    icon: { icon: "pencil" },
    iconMode: "only",
  })}
  ${buttonTemplate({
    type: "button",
    variant: "tertiary",
    label: "Verwijder",
    icon: { icon: "trash" },
    iconMode: "only",
  })}`;
}

export function dataGridTable(templates: Templates, actions = false) {
  const { anchorTemplate } = templates;

  return {
    caption: "Overzicht toegevoegde documenten",
    head: [{ label: "#" }, { label: "Documentnaam" }, { label: "Eigenaar" }, { label: "Upload datum" }].concat(
      actions ? { label: "Acties" } : [],
    ),
    rows: [
      ["1", anchorTemplate({ label: "Tekening.jpg", url: "#tekening" }), "P.K. Puk", "21-07-2019"].concat(
        actions ? actionsTemplate(templates) : [],
      ),
      ["2", anchorTemplate({ label: "Omgevingsplan.jpg", url: "#omgevingsplan" }), "H.G. Griff", "22-07-2019"].concat(
        actions ? actionsTemplate(templates) : [],
      ),
      ["3", anchorTemplate({ label: "Bodemonderzoek.jpg", url: "#bodemonderzoek" }), "P.K. Puk", "23-07-2019"].concat(
        actions ? actionsTemplate(templates) : [],
      ),
      ["4", anchorTemplate({ label: "Maatregelen.jpg", url: "#maatregelen" }), "P.K. Puk", "23-07-2019"].concat(
        actions ? actionsTemplate(templates) : [],
      ),
      ["5", anchorTemplate({ label: "Plattegrond.jpg", url: "#omgevingsplan" }), "P.K. Puk", "28-07-2019"].concat(
        actions ? actionsTemplate(templates) : [],
      ),
    ],
  };
}
