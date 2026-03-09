import { Button } from "../button/button.models.js";

export interface MapMessage {
  variant: "success" | "error" | "instruction";
  message: string;
  showButtons?: boolean;
  buttons?: Button[];
}
