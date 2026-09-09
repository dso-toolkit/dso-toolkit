import { AdvancedSelect } from "../advanced-select/advanced-select.models.js";
import { DefinitionList } from "../definition-list/definition-list.models.js";

export type variant = "ontwerp" | "besluitversie";

export type featuresContentType = Map<variant | "vastgesteld", Map<"features" | "besluitinformatie", DefinitionList>>;

export interface DocumentHeader {
  title: string;
  type: string;
  owner?: string;
  featuresContent: featuresContentType;
  featuresOpen?: boolean;
  featureAction?: (e: MouseEvent) => void;
  advancedSelect: AdvancedSelect;
  sticky?: boolean;
  statusMessage?: string;
  variant?: variant;
}
