import { Icon } from "dso-toolkit";
import * as React from "react";

import { DsoIcon } from "../../components";

export function iconTemplate({ icon, slot }: Icon) {
  return <DsoIcon icon={icon} slot={slot}></DsoIcon>;
}
