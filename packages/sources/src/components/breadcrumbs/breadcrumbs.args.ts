import { ArgTypes } from "../../storybook";

import { Breadcrumb, Breadcrumbs } from "./breadcrumbs.models";

export interface BreadcrumbsArgs {
  breadcrumbs: Breadcrumb[];
}

export const breadcrumbsArgTypes: ArgTypes<BreadcrumbsArgs> = {
  breadcrumbs: {
    control: {
      disable: true,
    },
  },
};

export function breadcrumbsArgsMapper(a: BreadcrumbsArgs): Breadcrumbs {
  return {
    breadcrumbs: a.breadcrumbs,
  };
}
