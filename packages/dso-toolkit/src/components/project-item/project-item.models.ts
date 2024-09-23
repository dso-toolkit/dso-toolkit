import { Button } from "../button";
import { DefinitionList } from "../definition-list";
import { HeadingLevel } from "../heading/heading.models";

export interface ProjectItem<TemplateFnReturnType> {
  title: string;
  href: string;
  headingLevel?: HeadingLevel;
  label?: string;
  progress?: DefinitionList<TemplateFnReturnType>;
  status: DefinitionList<TemplateFnReturnType>;
  actions?: Button[];
}
