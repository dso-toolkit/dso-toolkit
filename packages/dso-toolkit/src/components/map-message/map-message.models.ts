export interface MapMessage {
  message: string;
  variant: "success" | "error" | "instruction";
  showButtons?: boolean;
  buttonLabels?: string[];
  buttonIcons?: string[];
}
