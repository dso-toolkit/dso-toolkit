import { HistoryItem } from "./history-items.models";

export const headings = ["Datum", "Gebeurtenis"];

export const historyItems: HistoryItem[] = [
  {
    date: "02-08-2025",
    statusMessage: "Dit is de status message",
    type: "besluit",
    title: "Dit is de title. Deze heeft alles. Ik ben een Besluit",
    href: "#",
    explanation: "Een explanation",
    warning: "Een warning",
  },
  {
    date: "03-08-2025",
    statusMessage: "Dit heeft alleen de status message en is een Waarschuwing",
    type: "waarschuwing",
  },
  {
    date: "04-08-2025",
    statusMessage: "Dit is de status message van een Tijdelijk Regelingdeel",
    type: "tijdelijk-regelingdeel",
    title: "Dit is de title. Deze heeft geen warning en explanation",
    href: "#",
  },
  {
    date: "05-08-2025",
    statusMessage: "Dit is de status message",
    type: "in-werking",
    title: "Dit is de title. Deze his In Werking",
    href: "#",
  },
  {
    date: "06-08-2025",
    statusMessage: "Dit is de status message",
    type: "ontwerp",
    title: "Dit is de title. Ik Ontwerp",
    href: "#",
  },
];
