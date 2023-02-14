const cardContent = {
  label: "Omgevingsplan Nieuwegein",
  selectable: false,
  image: undefined,
  clickable: true,
  addon: {
    status: "warning",
    compact: true,
    label: "Ontwerp",
    slotName: "addon",
  },
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
    },
  ],
};

export const cardContentToggletip = {
  ...cardContent,
  interactions: [
    {
      children: "Extra informatie",
      label: "Toon informatie",
      position: "left",
      small: false,
      secondary: false,
    },
  ],
};
