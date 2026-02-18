export interface MapMessage {
  message: string;
  variant: "success" | "error" | "instruction";
  buttonLabels?: string[];
  dsoActionClick?: (event: CustomEvent<MapMessageActionClickEvent>) => void;
}

export interface MapMessageActionClickEvent {
  actionIndex: number;
  originalEvent: MouseEvent;
}
