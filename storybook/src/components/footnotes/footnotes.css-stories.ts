import type { Meta } from "@storybook/web-components";
import { footnotesMeta, footnotesStories } from "dso-toolkit";

import readme from "dso-toolkit/src/components/footnotes/readme.md?raw";
import { templateContainer } from "../../templates";
import { html } from "lit-html";

const meta: Meta = {
  ...footnotesMeta({ readme }),
  title: "HTML|CSS/Footnotes",
};

export default meta;

const { Example, Reference, List } = footnotesStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { footnoteTemplate, footnotesTemplate } = templates;

    return {
      footnoteTemplate,
      footnotesTemplate,
      footnotesExampleTemplate: (footnote14, footnote15, footnotes) => html`
        <p>
          In juli 2018 is er een quick scan natuur uitgevoerd voor het plangebied${footnoteTemplate(footnote14)}. Dit
          onderzoek is een actualisatie van een eerder door Blom Ecologie uitgevoerd oriënterend onderzoek dat vanwege
          de datum van uitvoering haar geldigheid was verloren. In januari 2019 is dit onderzoek
          aangevuld${footnoteTemplate(footnote15)} met vrije kavel, welke eveneens onderdeel zijn van dit
          bestemmingsplan.
        </p>
        ${footnotesTemplate(footnotes)}
      `,
    };
  },
});

export { Example, Reference, List };
