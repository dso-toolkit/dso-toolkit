import { html } from "lit-html";

import {
  AccordionSection,
  AccordionSectionActiveChangeEvent,
  AccordionSectionToggleClickEvent,
} from "../../../components/accordion/accordion.models.js";
import { PlekinfoCard } from "../../../components/plekinfo-card/plekinfo-card.models.js";
import { plekinfoCardTemplate } from "../../../components/plekinfo-card/plekinfo-card.template.js";

const symbol = (symbolCode: string) => html`<span class="symboolcode" data-symboolcode=${symbolCode}></span>`;

type AccordionSectionElement = HTMLElement & {
  open: boolean;
  active: boolean;
};

function isAccordionSection(target: EventTarget | null): target is AccordionSectionElement {
  return target instanceof HTMLElement && target.tagName === "DSO-ACCORDION-SECTION";
}

function dsoToggleClick(event: CustomEvent<AccordionSectionToggleClickEvent>) {
  if (isAccordionSection(event.target)) {
    event.target.open = event.detail.open;
  }
}

function dsoActiveChange(event: CustomEvent<AccordionSectionActiveChangeEvent>) {
  if (isAccordionSection(event.target)) {
    event.target.active = event.detail.next;
  }
}

export function plekinfoCardInAccordionSections(): AccordionSection[] {
  const meta = { status: "warning" as const, compact: true, label: "Ontwerp" };
  const interaction = { checked: false, accessibleLabel: "Schakel activiteit in of uit" };

  return [
    {
      handleTitle: "Bouwactiviteit (3)",
      heading: "h2",
      open: true,
      activatable: true,
      active: false,
      dsoToggleClick,
      dsoActiveChange,
      content: html`
        ${plekinfoCardTemplate({
          label: "Bouwactiviteit",
          href: "#",
          targetBlank: false,
          interaction,
          noStroke: true,
          items: [
            {
              symbool: symbol("vgz023"),
              label: "vergunningplicht",
              sublabel: "in: bebouwde kom, industriezone, dijkgebied",
            },
            {
              symbool: symbol("vszt030"),
              label: "toegestaan",
              sublabel: "in: ontwikkelzone",
              meta,
            },
            {
              symbool: symbol("vgz023"),
              label: { value: { was: "vergunningplicht", wordt: "toegestaan" } },
              sublabel: "in: buitengebied",
            },
          ],
        } satisfies PlekinfoCard)}
      `,
    },
    {
      handleTitle: "Omgevingsnorm (4)",
      heading: "h2",
      open: true,
      activatable: true,
      active: false,
      dsoToggleClick,
      dsoActiveChange,
      content: html`
        ${plekinfoCardTemplate({
          label: "Maximale bouwhoogte",
          href: "#",
          targetBlank: false,
          interaction,
          noStroke: true,
          items: [
            {
              symbool: symbol("vgz023"),
              label: "10 meter",
            },
            {
              symbool: symbol("vgz023"),
              label: "12 meter",
              meta,
            },
            {
              symbool: symbol("vgz023"),
              label: "14 meter",
            },
            {
              symbool: symbol("vgz023"),
              label: "18 meter",
            },
          ],
        } satisfies PlekinfoCard)}
      `,
    },
  ];
}
