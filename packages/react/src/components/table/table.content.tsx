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
