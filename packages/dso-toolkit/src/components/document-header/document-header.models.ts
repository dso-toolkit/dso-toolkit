import { AdvancedSelect } from "../advanced-select";
import { DefinitionList } from "../definition-list";

export type variant = "ontwerp" | "besluitversie";

export interface DocumentHeader<TemplateFnReturnType> {
  title: string;
  type: string;
  owner?: string;
  featuresContent: Map<string, Map<string, DefinitionList<TemplateFnReturnType>>>;
  featuresOpen?: boolean;
  featureAction?: (e: MouseEvent) => void;
  advancedSelect: AdvancedSelect<unknown>;
  sticky?: boolean;
  statusMessage?: string;
  variant?: variant;
}
