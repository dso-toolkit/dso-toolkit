import type { ArgTypes } from "@storybook/web-components-vite";

import { noControl } from "../../shared/no-control.js";

import { Breadcrumb, Breadcrumbs } from "./breadcrumbs.models.js";

export interface BreadcrumbsArgs {
  breadcrumbs: Breadcrumb[];
}

export const breadcrumbsArgTypes: ArgTypes<BreadcrumbsArgs> = {
  breadcrumbs: noControl(),
};

export function breadcrumbsArgsMapper(a: BreadcrumbsArgs): Breadcrumbs {
  return {
    breadcrumbs: a.breadcrumbs,
  };
}
