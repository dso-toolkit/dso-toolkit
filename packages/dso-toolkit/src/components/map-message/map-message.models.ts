export interface MapMessageActionClickEvent {}

export interface MapMessage {
  message: string;
  variant: "success" | "error" | "instruction";
  buttonLabels?: string[];
  buttonvariant?: "primary" | "secondary";
  dsoActionClick?: (event: CustomEvent<MapMessageActionClickEvent>) => void;
}
