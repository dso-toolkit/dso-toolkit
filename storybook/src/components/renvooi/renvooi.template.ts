import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Renvooi } from "./renvooi.models.js";

export function renvooiTemplate({ value, mark, dsoRenvooiMarkItemHighlight }: Renvooi) {
  return html`<dso-renvooi
    .value=${value}
    .mark=${ifDefined(mark)}
    @dsoRenvooiMarkItemHighlight=${dsoRenvooiMarkItemHighlight}
  ></dso-renvooi>`;
}
