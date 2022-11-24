import { AngularFramework } from "@storybook/angular";
import { angularBadge } from "components/badge/badge.angular-template";

import { TemplateContainer, ComponentsToTemplates, BaseComponentImplementation, Badge } from "../sources";

export interface Components {
  badge: Badge;
}

export type Templates = ComponentsToTemplates<Components, AngularFramework["storyResult"]>;
export type ComponentImplementation<Model> = BaseComponentImplementation<
  Model,
  Implementation,
  Templates,
  AngularFramework["storyResult"]
>;

type Implementation = "angular";

export const templateContainer = new TemplateContainer<Implementation, Templates, AngularFramework["storyResult"]>();

templateContainer.add(angularBadge);
