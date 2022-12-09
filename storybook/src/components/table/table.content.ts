import { Templates } from "../../templates";

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
    head: ["Nummer", "Voornaam", "Achternaam", "GitHub gebruikersnaam", "Modifier", "Een wat langere kolom"],
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
    head: ["Nummer", "Voornaam", "Achternaam", "GitHub gebruikersnaam", "Modifier", "Een kolom met afbeeldingen"],
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
