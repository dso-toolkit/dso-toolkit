import { AlertType } from "@dso-toolkit/sources";
import { html } from "lit-html";

import { alertTemplate } from "../../alert/alert.template";
import { buttonTemplate } from "../../button/button.template";
import { contextTemplate } from "../../context/context.template";
import { labelGroupTemplate } from "../../label-group/label-group.template";
import { viewerGridTemplate } from "../templates/viewer-grid.template";

export function viewerGridFilterblokExampleTemplate() {
  const activeFilters = [
    {
      label: "Geldend",
      status: "bright",
    },
    {
      label: "Regels",
      status: "bright",
    },
    {
      label: "Tuin",
      status: "bright",
    },
    {
      label: "Woongebied",
      status: "bright",
    },
    {
      label: "Geluidzone",
      status: "bright",
    },
    {
      label: "Thema: milieu algemeen",
      status: "bright",
    },
  ]

  return viewerGridTemplate({
    main: html`
      <section class="dso-filterblok">
        <div class="dso-highlight-box">
          ${contextTemplate({
            type: "label",
            label: html`<h3>Uw keuzes</h3>`,
            content: buttonTemplate({
              variant: "tertiary",
              label: "Alle opties",
              icon: {
                icon: "pencil",
              },
            }),
            children: html`
              <p class="dso-filterblok-address">Achterwillenseweg 9a, Gouda</p>
              ${labelGroupTemplate({ labels: activeFilters })}
            `,
          })}
        </div>
      </section>
    `,
    map: alertTemplate({ message: 'Dit is de kaart', status: AlertType.Info })
  });
};
