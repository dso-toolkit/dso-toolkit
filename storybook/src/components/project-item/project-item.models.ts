import { DefinitionList } from "../definition-list/definition-list.models.js";
import { HeadingLevel } from "../heading/heading.models.js";
import { IconButton } from "../icon-button/icon-button.models.js";

export interface ProjectItem<TemplateFnReturnType> {
  title: string;
  href: string;
  headingLevel?: HeadingLevel;
  label?: string;
  progress?: DefinitionList<TemplateFnReturnType>;
  status: DefinitionList<TemplateFnReturnType>;
  actions?: IconButton[];
}
