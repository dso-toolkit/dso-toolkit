import { Card } from "./card.models";

export const cardContent: Card<unknown> = {
  label: "Omgevingsplan Nieuwegein",
  image: undefined,
  href: "#",
};

export const cardContentButton: Card<unknown> = {
  ...cardContent,
  interactions: [
    {
      variant: "tertiary",
      label: "Toon informatie",
      icon: {
        icon: "info",
      },
      screenreaderSuffix: `over "${cardContent.label}"`,
    },
  ],
};

export const cardContentToggletip: Card<unknown> = {
  ...cardContent,
  interactions: [
    {
      children: "Extra informatie",
      label: `Toon informatie over "${cardContent.label}"`,
      position: "left",
      small: false,
      secondary: false,
    },
  ],
};

export const cardContentLabel: Card<unknown> = {
  ...cardContent,
  interactions: [
    {
      status: "warning",
      compact: true,
      label: "Ontwerp",
    },
  ],
};

export const cardContentSlideToggle: Card<unknown> = {
  ...cardContent,
  interactions: [
    {
      checked: false,
      accessibleLabel: "sr-only label van het schuifje",
    },
  ],
};
