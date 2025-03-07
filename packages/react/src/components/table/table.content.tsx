const imageOverlayHtml = `<dso-image-overlay>
  <img
    src="images/canvas-home_iplo-min.png"
    alt="Een afbeelding"
    width="250"
  >
</dso-image-overlay>`;

export const defaultTable = {
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
    ["1", '<a href="#fabien">Fabien</a>', "Potencier", "fabpot", "<code>tr</code>", "eenhelelangekolomdienietbreekt"],
    ["2", '<a href="#andrew">Andrew</a>', "Nesbitt", "andrew", "<code>tr</code>", "eenhelelangekolomdienietbreekt"],
    [
      "3",
      '<a href="#taylor">Taylor</a>',
      "Otwell",
      "taylorotwell",
      "<code>tr</code>",
      "eenhelelangekolomdienietbreekt",
    ],
    [
      "4",
      '<a href="#kitty">Kitty</a>',
      "Giraudel",
      "KittyGiraudel",
      "<code>tr</code>",
      "eenhelelangekolomdienietbreekt",
    ],
  ],
};

export const imageOverlayTable = {
  caption: "Overzicht van gebruikersnamen",
  head: [
    { label: "Nummer" },
    { label: "Voornaam" },
    { label: "Achternaam" },
    { label: "GitHub gebruikersnaam" },
    { label: "Modifier" },
    { label: "Een kolom met afbeeldingen" },
  ],
  rows: [
    ["1", '<a href="#fabien">Fabien</a>', "Potencier", "fabpot", "<code>tr</code>", ""],
    ["2", '<a href="#andrew">Andrew</a>', "Nesbitt", "andrew", "<code>tr</code>", imageOverlayHtml],
    ["3", '<a href="#taylor">Taylor</a>', "Otwell", "taylorotwell", "<code>tr</code>", ""],
    ["4", '<a href="#kitty">Kitty</a>', "Giraudel", "KittyGiraudel", "<code>tr</code>", ""],
  ],
};

export const sortedAscendingTable = {
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
    ["1", '<a href="#fabien">Fabien</a>', "Potencier", "fabpot", "<code>tr</code>", "eenhelelangekolomdienietbreekt"],
    ["2", '<a href="#andrew">Andrew</a>', "Nesbitt", "andrew", "<code>tr</code>", "eenhelelangekolomdienietbreekt"],
    [
      "3",
      '<a href="#taylor">Taylor</a>',
      "Otwell",
      "taylorotwell",
      "<code>tr</code>",
      "eenhelelangekolomdienietbreekt",
    ],
    [
      "4",
      '<a href="#kitty">Kitty</a>',
      "Giraudel",
      "KittyGiraudel",
      "<code>tr</code>",
      "eenhelelangekolomdienietbreekt",
    ],
  ],
};

export const sortedDescendingTable = {
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
      '<a href="#kitty">Kitty</a>',
      "Giraudel",
      "KittyGiraudel",
      "<code>tr</code>",
      "eenhelelangekolomdienietbreekt",
    ],
    [
      "3",
      '<a href="#taylor">Taylor</a>',
      "Otwell",
      "taylorotwell",
      "<code>tr</code>",
      "eenhelelangekolomdienietbreekt",
    ],
    ["2", '<a href="#andrew">Andrew</a>', "Nesbitt", "andrew", "<code>tr</code>", "eenhelelangekolomdienietbreekt"],
    ["1", '<a href="#fabien">Fabien</a>', "Potencier", "fabpot", "<code>tr</code>", "eenhelelangekolomdienietbreekt"],
  ],
};

const actions =
  '<button type="button" class="dso-tertiary"><span class="sr-only">Bewerk</span><dso-icon icon="pencil"></dso-icon></button><button type="button" class="dso-tertiary"><span class="sr-only">Verwijder</span><dso-icon icon="trash"></dso-icon></button>';

export const dataGridTable = {
  caption: "Overzicht toegevoegde documenten",
  head: [
    { label: "#" },
    { label: "Documentnaam" },
    { label: "Eigenaar" },
    { label: "Upload datum" },
    { label: "Acties" },
  ],
  rows: [
    ["1", '<a href="#tekening">Tekening.jpg</a>', "P.K. Puk", "21-07-2019", actions],
    ["2", '<a href="#omgevingsplan">Omgevingsplan.jpg</a>', "H.G. Griff", "22-07-2019", actions],
    ["3", '<a href="#bodemonderzoek">Bodemonderzoek.jpg</a>', "P.K. Puk", "23-07-2019", actions],
    ["4", '<a href="#maatregelen">Maatregelen.jpg</a>', "P.K. Puk", "23-07-2019", actions],
    ["5", '<a href="#omgevingsplan">Plattegrond.jpg</a>', "P.K. Puk", "28-07-2019", actions],
  ],
};

export const dataTableTable = {
  caption: "Overzicht toegevoegde documenten",
  head: [{ label: "#" }, { label: "Documentnaam" }, { label: "Eigenaar" }, { label: "Upload datum" }],
  rows: [
    ["1", '<a href="#tekening">Tekening.jpg</a>', "P.K. Puk", "21-07-2019"],
    ["2", '<a href="#omgevingsplan">Omgevingsplan.jpg</a>', "H.G. Griff", "22-07-2019"],
    ["3", '<a href="#bodemonderzoek">Bodemonderzoek.jpg</a>', "P.K. Puk", "23-07-2019"],
    ["4", '<a href="#maatregelen">Maatregelen.jpg</a>', "P.K. Puk", "23-07-2019"],
    ["5", '<a href="#omgevingsplan">Plattegrond.jpg</a>', "P.K. Puk", "28-07-2019"],
  ],
};
