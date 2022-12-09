import { DefinitionList } from "../definition-list/definition-list.models.js";

export interface DocumentHeader<TemplateFnReturnType> {
  title: string;
  type: string;
  owner: string;
  features: DefinitionList<TemplateFnReturnType>;
  featuresOpen?: boolean;
  featureAction?: (e: MouseEvent) => void;
  status: TemplateFnReturnType;
  statusContentOpen?: boolean;
  statusContent?: TemplateFnReturnType;
  sticky?: boolean;
}
