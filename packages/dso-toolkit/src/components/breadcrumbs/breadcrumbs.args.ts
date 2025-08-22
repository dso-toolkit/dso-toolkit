import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../storybook";

import { Breadcrumb, Breadcrumbs } from "./breadcrumbs.models.js";

export interface BreadcrumbsArgs {
  breadcrumbs: Breadcrumb[];
}

export const breadcrumbsArgTypes: ArgTypes<BreadcrumbsArgs> = {
  breadcrumbs: argTypeAction(),
};

export function breadcrumbsArgsMapper(a: BreadcrumbsArgs): Breadcrumbs {
  return {
    breadcrumbs: a.breadcrumbs,
  };
}
