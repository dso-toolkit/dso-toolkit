import { AdvancedSelect } from "../advanced-select";
import { DefinitionList } from "../definition-list";

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
  advancedSelect: AdvancedSelect<unknown>;
  sticky?: boolean;
  statusMessage?: string;
  variant?: variant;
}
