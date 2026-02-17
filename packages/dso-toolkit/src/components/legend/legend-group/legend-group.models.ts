import { LegendMode } from "../legend.models.js";

export interface LegendGroup<TemplateFnReturnType = unknown> {
  mode?: LegendMode;
  heading?: TemplateFnReturnType;
  children?: TemplateFnReturnType;
  dsoLegendGroupModeChange?: (e: CustomEvent) => void;
}
