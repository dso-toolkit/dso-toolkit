import { DefinitionList } from "../definition-list/definition-list.models.js";
import { AdvancedSelect } from "../advanced-select";

export interface DocumentHeader<TemplateFnReturnType> {
  title: string;
  type: string;
  owner?: string;
  features: DefinitionList<TemplateFnReturnType>;
  featuresOpen?: boolean;
  featureAction?: (e: MouseEvent) => void;
  advancedSelect: AdvancedSelect<unknown>;
  sticky?: boolean;
}
