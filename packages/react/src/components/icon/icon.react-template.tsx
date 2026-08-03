import { Icon } from "dso-toolkit";
import { SlottableTemplate } from "dso-toolkit/dist/template-container";
import * as React from "react";

import { DsoIcon } from "../../components";

export function iconTemplate({ icon, slot }: Icon & SlottableTemplate) {
  return <DsoIcon icon={icon} slot={slot}></DsoIcon>;
}
