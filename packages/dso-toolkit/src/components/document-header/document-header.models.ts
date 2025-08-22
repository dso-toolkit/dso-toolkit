import { AdvancedSelect } from "../advanced-select";
import { DefinitionList } from "../definition-list/definition-list.models.js";

export interface DocumentHeader<TemplateFnReturnType> {
  title: string;
  type: string;
  owner?: string;
  features: DefinitionList<TemplateFnReturnType>;
  featuresOpen?: boolean;
  featureAction?: (e: MouseEvent) => void;
  advancedSelect: AdvancedSelect<unknown>;
  sticky?: boolean;
  statusMessage?: string;
  variant?: "vastgesteld" | "ontwerp" | "besluitversie";
}
