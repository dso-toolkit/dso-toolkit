export interface Card<TemplateFnReturnType> {
  label: string;
  content: TemplateFnReturnType | string;
  interactions: Interaction[];
}

export interface Interaction {
  toggle: InteractionToggle[];
}

export interface InteractionToggle {
  id: string;
  label: string;
}
