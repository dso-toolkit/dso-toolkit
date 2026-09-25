import { DefinitionList } from "../definition-list/definition-list.models.js";
import { HeadingLevel } from "../heading/heading.models.js";
import { IconButton } from "../icon-button/icon-button.models.js";

export interface ProjectItem {
  title: string;
  href: string;
  headingLevel?: HeadingLevel;
  label?: string;
  progress?: DefinitionList;
  status: DefinitionList;
  actions?: IconButton[];
}
