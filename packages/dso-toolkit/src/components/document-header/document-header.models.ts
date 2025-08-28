import { AdvancedSelect } from "../advanced-select";
import { DefinitionList } from "../definition-list";

export type variant = "ontwerp" | "besluitversie";

export type Features<TemplateFnReturnType> = {
  variant?: variant;
  content: DefinitionList<TemplateFnReturnType>;
};

export interface DocumentHeader<TemplateFnReturnType> {
  title: string;
  type: string;
  owner?: string;
  features: Features<TemplateFnReturnType>[];
  featuresOpen?: boolean;
  featureAction?: (e: MouseEvent) => void;
  advancedSelect: AdvancedSelect<unknown>;
  sticky?: boolean;
  statusMessage?: string;
  variant?: variant;
}
