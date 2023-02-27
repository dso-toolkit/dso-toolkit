import { TemplateResult } from "lit-html";
import { AccordionSection } from "dso-toolkit";
import { Templates } from "../../templates";

export function subSections(templates: Templates): AccordionSection<TemplateResult>[] {
  const { accordionTemplate, richContentTemplate } = templates;

  return [
    {
      ...section1,
      content: html` ${richContentTemplate({ children: html`<p><strong>hallo</strong> dit is content</p>` })}
      ${accordionTemplate({
        sections: [
          {
            handleTitle: "Voor hoeveel locaties kan ik de Vergunningcheck doen?",
            heading: "h4",
            content: richContentTemplate({
              children: html` <p><strong>hallo</strong> dit is content</p> `,
            }),
          },
          {
            handleTitle: "Hoe lang duurt de Vergunningcheck?",
            heading: "h4",
            open: true,
            content: richContentTemplate({
              children: html`
                De Vergunningcheck duurt ongeveer vijf minuten per gekozen werkzaamheid. Het is wel belangrijk dat u
                alle benodigde informatie bij de hand heeft.
              `,
            }),
          },
        ],
      })}
      ${richContentTemplate({ children: html` <p><strong>hallo</strong> dit is content na de nested section</p> ` })}`,
    },
    section2,
    section3,
    section4(templates),
  ];
}
