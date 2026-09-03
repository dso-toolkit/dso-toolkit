import { isObject } from "../../shared/is-object.js";

export type LabelStatus =
  | "primary"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "bright"
  | "attention"
  | "filter"
  | "toegevoegd"
  | "verwijderd";

export interface Label {
  status?: LabelStatus;
  compact?: boolean;
  truncate?: boolean;
  label: string;
  removable?: boolean;
  dsoRemoveClick?: (e: CustomEvent<MouseEvent>) => void;
  symbol?: string;
}

export function isLabelInterface(object: unknown): object is Label {
  return isObject(object) && "compact" in object;
}
