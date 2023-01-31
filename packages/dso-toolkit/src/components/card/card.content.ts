const cardContent = {
  label: "Omgevingsplan Nieuwegein",
  selectable: false,
  image: undefined,
};

export const cardContentButton = {
  ...cardContent,
  interactions: [
    {
      type: "button",
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
      type: "toggletip",
      children: "Extra informatie",
      label: "Toon informatie",
      position: "left",
      small: false,
      secondary: false,
    },
  ],
};
