const cardContent = {
  label: "Omgevingsplan Nieuwegein",
  selectable: false,
  image: undefined,
  clickable: true,
};

export const cardContentButton = {
  ...cardContent,
  interactions: [
    {
      variant: "tertiary",
      label: "Toon informatie",
      icon: {
        icon: "info",
      },
      referenceLabel: cardContent.label,
    },
  ],
};

export const cardContentToggletip = {
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

export const cardContentLabel = {
  ...cardContent,
  interactions: [
    {
      status: "warning",
      compact: true,
      label: "Ontwerp",
    },
  ],
};
