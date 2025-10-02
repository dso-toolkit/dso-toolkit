import { DefinitionList } from "../definition-list";
import { HeadingLevel } from "../heading";
import { IconButton } from "../icon-button";

export interface ProjectItem<TemplateFnReturnType> {
  title: string;
  href: string;
  headingLevel?: HeadingLevel;
  label?: string;
  progress?: DefinitionList<TemplateFnReturnType>;
  status: DefinitionList<TemplateFnReturnType>;
  actions?: IconButton[];
}
