export interface MapMessageActionClickEvent {}

export interface MapMessage {
  message: string;
  variant: "success" | "error" | "introduction";
  buttonLabels?: string[];
  dsoActionClick?: (event: CustomEvent<MapMessageActionClickEvent>) => void;
}
