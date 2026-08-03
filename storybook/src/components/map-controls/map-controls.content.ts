export const baseLayers = [
  {
    id: 0,
    name: "Kaart",
  },
  {
    id: 1,
    name: "Luchtfoto",
    checked: true,
  },
  {
    id: 2,
    name: "Lavakaart",
    disabled: true,
    info: "Geen lava in geselecteerd gebied.",
  },
];

export const overlays = [
  {
    id: 0,
    name: "Kadastrale grenzen",
  },
  {
    id: 1,
    name: "Basisregistratie Adressen en Gebouwen (BAG)",
    checked: true,
  },
  {
    id: 2,
    name: "Riool",
    disabled: true,
    info: "Riool is niet beschikbaar op dit niveau.",
  },
];
