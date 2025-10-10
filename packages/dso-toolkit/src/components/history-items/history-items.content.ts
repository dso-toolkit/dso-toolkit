import { HistoryItemListPattern, ListPattern } from "./history-items.args";
import { HistoryItem } from "./history-items.models";

export function historyItems(type: HistoryItemListPattern): HistoryItem[] {
  if (type === "ontwerp") {
    return [
      {
        date: "20-07-2025",
        statusMessage: "Inzage tot 20-10-2025",
        type: "ontwerp",
        title: '"Voorbeschermingsregels hyperscale datacentra" opgenomen in plan',
        href: "#",
      },
      {
        date: "02-07-2025",
        statusMessage: " Inzage tot 02-09-2025",
        type: "ontwerp",
        title: '"Projectbesluit windmolenpark" toegevoegd',
        href: "#",
      },
      {
        date: "05-08-2024",
        statusMessage: "Inzage tot 05-10-2024",
        type: "ontwerp",
        title: "Wijziging in Hoofdstuk Herziening groen",
        href: "#",
      },
      {
        date: "15-03-2024",
        statusMessage: "Inzage tot 15-05-2024",
        type: "ontwerp",
        title: "Dark stores",
        href: "#",
      },
      {
        date: "05-09-2022",
        statusMessage: "Inzage tot 05-11-2022",
        type: "ontwerp",
        title: "Wijzinging bouwregels",
        href: "#",
      },
      {
        date: "05-05-2022",
        statusMessage: "Inzage tot 05-07-2022",
        type: "ontwerp",
        title: "Wijzinging in Hoofdstuk parkeren",
        href: "#",
      },
    ];
  }
  return [
    {
      date: "02-08-2025",
      statusMessage: "Besluit gepubliceerd:",
      type: "besluit",
      title: "Intrekking Omgevingsprogramma Veenendaal per 16-08-2025",
      href: "#",
    },
    {
      date: "20-07-2025",
      statusMessage: "Besluit “waterlozing datacentrum” niet opgenomen in de regeling",
      type: "waarschuwing",
    },
    {
      date: "15-07-2025",
      statusMessage: "Tijdelijk regelingdeel ingetrokken:",
      type: "tijdelijk-regelingdeel",
      title: "Voorbeschermingsregels hyperscale datacentra",
      href: "#",
    },
    {
      date: "10-07-2025",
      statusMessage: "Nieuwe versie in werking:",
      type: "in-werking",
      title: "Omgevingsplan Veenendaal",
      href: "#",
      explanation: `besluit “Waterlozing datacentrum” opgenomen`,
    },
    {
      date: "09-07-2025",
      statusMessage: "Nieuwe versie in werking:",
      type: "in-werking",
      title: "Omgevingsplan Veenendaal",
      href: "#",
      explanation: 'besluit "Uitbreiding datcentrum" opgenomen',
      warning: 'besluit "waterlozing datacentrum" opgenomen',
    },
    {
      date: "10-06-2025",
      statusMessage: "Besluit gepubliceerd:",
      type: "besluit",
      title: "Uitbreiding datacentrum",
      href: "#",
    },
    {
      date: "09-06-2025",
      statusMessage: "Besluit gepubliceerd:",
      type: "besluit",
      title: "Waterlozing datacentrum",
      href: "#",
    },
    {
      date: "20-02-2025",
      statusMessage: "Tijdelijk regelingdeel toegevoegd:",
      type: "tijdelijk-regelingdeel",
      title: "Voorbeschermingsregels hyperscale datacentra",
      href: "#",
    },
    {
      date: "01-01-2025",
      statusMessage: "Nieuwe versie in werking:",
      type: "in-werking",
      title: "Omgevingsplan Veenendaal",
      href: "#",
    },
  ];
}
