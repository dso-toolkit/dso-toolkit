import { Button } from "../button/button.models.js";

export interface MapMessage {
  variant: "success" | "error" | "instruction";
  message: string;
  buttons?: Button[];
}
