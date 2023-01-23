import { Accordion, AccordionSection } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";

import { ComponentImplementation } from "../../templates";

export const cssAccordion: ComponentImplementation<Accordion<TemplateResult>> = {
  component: "accordion",
  implementation: "html-css",
  template: ({ attachmentsCounterTemplate, iconTemplate }) =>
    function accordionTemplate(accordion) {
      const statusMap = new Map<string, string>([
        ["success", "succes:"],
        ["info", "info:"],
        ["warning", "waarschuwing:"],
        ["error", "fout:"],
      ]);

      function accordionHandleChildren(
        accordion: Accordion<TemplateResult>,
        section: AccordionSection<TemplateResult>
      ) {
        return html`
          ${section.state ? html`<span class="sr-only">${statusMap.get(section.state)}:</span>` : nothing}
          ${section.icon && accordion.reverseAlign
            ? html`<span class="dso-icon">${iconTemplate({ icon: section.icon })}</span>`
            : nothing}
          ${section.handleTitle}
          ${section.icon && !accordion.reverseAlign
            ? html`<span class="dso-icon">${iconTemplate({ icon: section.icon })}</span>`
            : nothing}
          ${section.status ? html`<span class="dso-status">${section.status}</span>` : nothing}
          ${section.attachmentCount ? html`${attachmentsCounterTemplate({ count: section.attachmentCount })}` : nothing}
        `;
      }

      function accordionHandleContent(accordion: Accordion<TemplateResult>, section: AccordionSection<TemplateResult>) {
        const ariaExpanded = (section.open ?? false).toString();
        const children = accordionHandleChildren(accordion, section);

        if (section.handleUrl) {
          return html`<a href=${section.handleUrl} aria-expanded=${ariaExpanded}>${children}</a>`;
        }

        return html`<button type="button" aria-expanded=${ariaExpanded}>${children}</button>`;
      }

      function accordionHandleTemplate(
        accordion: Accordion<TemplateResult>,
        section: AccordionSection<TemplateResult>
      ) {
        const content = accordionHandleContent(accordion, section);

        switch (section.heading) {
          case "h2":
            return html`<h2 class="dso-section-handle">${content}</h2>`;
          case "h3":
            return html`<h3 class="dso-section-handle">${content}</h3>`;
          case "h4":
            return html`<h4 class="dso-section-handle">${content}</h4>`;
          case "h5":
            return html`<h5 class="dso-section-handle">${content}</h5>`;
        }
      }

      function accordionSectionTemplate(
        accordion: Accordion<TemplateResult>,
        section: AccordionSection<TemplateResult>
      ): TemplateResult {
        const hasNestedAccordion = section.content?.strings.includes("<dso-accordion") ?? false;

        if (!section.heading) {
          section.heading = "h2";
        }

        return html`
          <div
            class="dso-accordion-section ${classMap({
              [`dso-${section.state}`]: !!section.state,
              "dso-open": !!section.open,
              "dso-nested-accordion": hasNestedAccordion,
            })}"
          >
            ${accordionHandleTemplate(accordion, section)}
            ${section.open ? html`<div class="dso-section-body">${section.content}</div>` : nothing}
          </div>
        `;
      }

      return html`
        <div
          class="dso-accordion ${classMap({
            [`dso-accordion-${accordion.variant}`]: !!accordion.variant,
            "dso-accordion-reverse-align": !!accordion.reverseAlign,
          })}"
        >
          ${accordion.sections.map((section) => accordionSectionTemplate(accordion, section))}
        </div>
      `;
    },
};
