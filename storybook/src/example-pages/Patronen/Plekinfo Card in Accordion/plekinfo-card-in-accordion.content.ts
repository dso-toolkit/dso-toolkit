import {
  AccordionSection,
  AccordionSectionActiveChangeEvent,
  AccordionSectionToggleClickEvent,
  PlekinfoCard,
} from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

const symbol = (symbolCode: string) => html`<span class="symboolcode" data-symboolcode=${symbolCode}></span>`;

function isAccordionSection(target: EventTarget | null): target is HTMLDsoAccordionSectionElement {
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

export function plekinfoCardInAccordionSections(
  plekinfoCardTemplate: (properties: PlekinfoCard<TemplateResult>) => TemplateResult,
): AccordionSection<TemplateResult>[] {
  const meta = { status: "warning" as const, compact: true, label: "Ontwerp" };
  const interaction = { checked: false, accessibleLabel: "Schakel activiteit in of uit" };

  return [
    {
      handleTitle: "Bouwactiviteit (5)",
      heading: "h2",
      open: true,
      activatable: true,
      active: false,
      dsoToggleClick,
      dsoActiveChange,
      content: html`
        ${plekinfoCardTemplate({
          label: "bijbehorend bouwwerk bouwen",
          href: "#",
          targetBlank: false,
          symbool: symbol("vgz023"),
          interaction,
          items: [
            {
              symbool: symbol("vgz023"),
              label: "vergunningplicht",
              sublabel: "in: bebouwde kom, industrie zone, dijkgebied",
              meta,
            },
            {
              symbool: symbol("vszt030"),
              label: "verbod",
              sublabel: "in: buitengebied",
              meta,
              wijzigactie: "verwijder",
            },
            {
              symbool: symbol("vszt030"),
              label: "vergunningplicht",
              sublabel: "in: bebouwde kom, industrie zone, dijkgebied",
              meta,
              wijzigactie: "voegtoe",
            },
            {
              symbool: symbol("vgz023"),
              label: { value: { was: "vergunningplicht", wordt: "Toegestaan" } },
              sublabel: "in: ontwikkelzone",
              meta,
            },
          ],
        })}
        ${plekinfoCardTemplate({
          label: "bouwactiviteit",
          href: "#",
          targetBlank: false,
          symbool: symbol("vgz023"),
          interaction,
          noStroke: true,
          items: [
            { symbool: symbol("vgz023"), label: "12 meter" },
            { symbool: symbol("vgz023"), label: "10 meter", meta },
          ],
        })}
      `,
    },
  ];
}
