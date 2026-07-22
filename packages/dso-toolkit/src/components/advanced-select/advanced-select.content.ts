import { AdvancedSelectGroup, AdvancedSelectOption, AdvancedSelectPlaceholder } from "./advanced-select.models.js";

export const options: (AdvancedSelectOption<unknown> | AdvancedSelectGroup<unknown> | AdvancedSelectPlaceholder)[] = [
  {
    label: "Geldende versie",
    variant: "success",
    redirect: {
      href: "#",
      label: "Bekijk volledig wijzigingenoverzicht",
    },
    options: [
      {
        label: "In werking (laatst gewijzigd: 01-01-2024)",
      },
    ],
  },
  {
    label: "Wijzigingsbesluiten",
    activeLabel: "Besluit",
    badgeLabel: "Toon toelichting op wijzigingsbesluiten",
    variant: "primary",
    toggletip: "Er zijn wijzigingsbesluiten genomen. Bekijk een besluit om de veranderingen te zien.",
    redirect: {
      href: "#",
      label: "Bekijk historie",
    },
    summaryCounter: true,
    options: [
      {
        label: "Citeertitel van het besluit (In werking per 01-03-2024)",
      },
      {
        label: "Citeertitel van het besluit (In werking per 01-04-2024)",
      },
    ],
  },
  {
    label: "Ontwerpbesluiten ter inzage",
    activeLabel: "Ontwerp",
    variant: "warning",
    toggletip:
      "Er zijn één of meer ontwerpbesluiten genomen. Bekijk een ontwerpbesluit om de voorgestelde veranderingen te zien.",
    redirect: {
      href: "#",
      label: "Bekijk ontwerpen met afgeronde inzage termijn",
    },
    summaryCounter: true,
    options: [
      {
        label: "Verandering in annotaties (Einde inzage: 01-02-2024)",
      },
      {
        label: "Herziening Achterwillense-weg 12-34 (Einde inzage: 08-02-2024)",
      },
      {
        label:
          "Algemene regels voor het beheer en onderhoud van waterstaatswerken en het gebruik van watersystemen (Keur waterschap Vechtstromen 2020) (Einde inzage: 09-02-2024)",
      },
    ],
  },
];

export const placeholderOptions: (
  AdvancedSelectOption<unknown> | AdvancedSelectGroup<unknown> | AdvancedSelectPlaceholder
)[] = [
  {
    label: "Geldende versie",
    variant: "success",
    redirect: {
      href: "#",
      label: "Bekijk volledig wijzigingenoverzicht",
    },
    options: [
      {
        label: "In werking (laatst gewijzigd: 01-01-2024)",
      },
    ],
  },
  {
    label: "Wijzigingsbesluiten",
    activeLabel: "Besluit",
    badgeLabel: "Toon toelichting op wijzigingsbesluiten",
    variant: "primary",
    toggletip: "Er zijn wijzigingsbesluiten genomen. Bekijk een besluit om de veranderingen te zien.",
    redirect: {
      href: "#",
      label: "Bekijk historie",
    },
    summaryCounter: true,
    options: [
      {
        label: "Citeertitel van het besluit (In werking per 01-03-2024)",
      },
      {
        label: "Citeertitel van het besluit (In werking per 01-04-2024)",
      },
    ],
  },
  {
    label: "Ontwerpbesluiten ter inzage",
    placeholder: "Er zijn alleen ontwerpen met een afgeronde inzage termijn voor dit document.",
    redirect: {
      href: "#",
      label: "Bekijk ontwerpen met afgeronde inzage termijn",
    },
  },
];
