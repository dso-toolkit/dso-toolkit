import { AdvancedSelect } from "../advanced-select/advanced-select.models.js";
import { DefinitionList } from "../definition-list/definition-list.models.js";

export type variant = "ontwerp" | "besluitversie";

export type featuresContentType<TemplateFnReturnType> = Map<
  variant | "vastgesteld",
  Map<"features" | "besluitinformatie", DefinitionList<TemplateFnReturnType>>
>;

export interface DocumentHeader<TemplateFnReturnType> {
  title: string;
  type: string;
  owner?: string;
  featuresContent: featuresContentType<TemplateFnReturnType>;
  featuresOpen?: boolean;
  featureAction?: (e: MouseEvent) => void;
  advancedSelect: AdvancedSelect<TemplateFnReturnType>;
  sticky?: boolean;
  statusMessage?: string;
  variant?: variant;
}
