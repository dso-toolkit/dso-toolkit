import { ArgTypes } from "storybook/internal/types";

import { Breadcrumb, Breadcrumbs } from "./breadcrumbs.models.js";

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
