import { Badge } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoBadge } from "../..";

import { ComponentImplementation } from "../../templates";

export const reactBadge: ComponentImplementation<Badge> = {
  component: "badge",
  implementation: "react",
  template: () =>
    function badgeTemplate({ status, message }) {
      return <DsoBadge status={status}>{message}</DsoBadge>;
    },
};
