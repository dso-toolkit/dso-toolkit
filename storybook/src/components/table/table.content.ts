import { html } from "lit-html";

import { Templates } from "../../templates";

const imageOverlayHtml = `<dso-image-overlay>
  <img
    src="images/canvas-home_iplo-min.png"
    alt="Een afbeelding"
    width="250"
  >
</dso-image-overlay>`;

export function defaultTable({ linkTemplate }: Templates) {
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
        linkTemplate({ label: "Fabien", url: "#fabien" }),
        "Potencier",
        "fabpot",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "2",
        linkTemplate({ label: "Andrew", url: "#andrew" }),
        "Nesbitt",
        "andrew",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "3",
        linkTemplate({ label: "Taylor", url: "#taylor" }),
        "Otwell",
        "taylorotwell",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "4",
        linkTemplate({ label: "Kitty", url: "#kitty" }),
        "Giraudel",
        "KittyGiraudel",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
    ],
  };
}

export function imageOverlayTable({ linkTemplate }: Templates) {
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
      ["1", linkTemplate({ label: "Fabien", url: "#fabien" }), "Potencier", "fabpot", "<code>tr</code>", ""],
      [
        "2",
        linkTemplate({ label: "Andrew", url: "#andrew" }),
        "Nesbitt",
        "andrew",
        "<code>tr</code>",
        imageOverlayHtml,
      ],
      ["3", linkTemplate({ label: "Taylor", url: "#taylor" }), "Otwell", "taylorotwell", "<code>tr</code>", ""],
      ["4", linkTemplate({ label: "Kitty", url: "#kitty" }), "Giraudel", "KittyGiraudel", "<code>tr</code>", ""],
    ],
  };
}

export function sortedAscendingTable({ linkTemplate }: Templates) {
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
        linkTemplate({ label: "Fabien", url: "#fabien" }),
        "Potencier",
        "fabpot",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "2",
        linkTemplate({ label: "Andrew", url: "#andrew" }),
        "Nesbitt",
        "andrew",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "3",
        linkTemplate({ label: "Taylor", url: "#taylor" }),
        "Otwell",
        "taylorotwell",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "4",
        linkTemplate({ label: "Kitty", url: "#kitty" }),
        "Giraudel",
        "KittyGiraudel",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
    ],
  };
}

export function sortedDescendingTable({ linkTemplate }: Templates) {
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
        linkTemplate({ label: "Kitty", url: "#kitty" }),
        "Giraudel",
        "KittyGiraudel",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "3",
        linkTemplate({ label: "Taylor", url: "#taylor" }),
        "Otwell",
        "taylorotwell",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "2",
        linkTemplate({ label: "Andrew", url: "#andrew" }),
        "Nesbitt",
        "andrew",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
      [
        "1",
        linkTemplate({ label: "Fabien", url: "#fabien" }),
        "Potencier",
        "fabpot",
        "<code>tr</code>",
        "eenhelelangekolomdienietbreekt",
      ],
    ],
  };
}

function actionsTemplate({ iconButtonTemplate }: Templates) {
  return html`${iconButtonTemplate({
    variant: "tertiary",
    accessibleLabel: "Bewerk",
    icon: "pencil",
  })}
  ${iconButtonTemplate({
    variant: "tertiary",
    accessibleLabel: "Verwijder",
    icon: "trash",
  })}`;
}

export function dataGridTable(templates: Templates, actions = false) {
  const { linkTemplate } = templates;

  return {
    caption: "Overzicht toegevoegde documenten",
    head: [{ label: "#" }, { label: "Documentnaam" }, { label: "Eigenaar" }, { label: "Upload datum" }].concat(
      actions ? { label: "Acties" } : [],
    ),
    rows: [
      ["1", linkTemplate({ label: "Tekening.jpg", url: "#tekening" }), "P.K. Puk", "21-07-2019"].concat(
        actions ? actionsTemplate(templates) : [],
      ),
      ["2", linkTemplate({ label: "Omgevingsplan.jpg", url: "#omgevingsplan" }), "H.G. Griff", "22-07-2019"].concat(
        actions ? actionsTemplate(templates) : [],
      ),
      ["3", linkTemplate({ label: "Bodemonderzoek.jpg", url: "#bodemonderzoek" }), "P.K. Puk", "23-07-2019"].concat(
        actions ? actionsTemplate(templates) : [],
      ),
      ["4", linkTemplate({ label: "Maatregelen.jpg", url: "#maatregelen" }), "P.K. Puk", "23-07-2019"].concat(
        actions ? actionsTemplate(templates) : [],
      ),
      ["5", linkTemplate({ label: "Plattegrond.jpg", url: "#omgevingsplan" }), "P.K. Puk", "28-07-2019"].concat(
        actions ? actionsTemplate(templates) : [],
      ),
    ],
  };
}
