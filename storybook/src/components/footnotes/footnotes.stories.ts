import { html } from "lit-html";
import { storiesOfFootnotes, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/footnotes/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfFootnotes({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ footnoteTemplate, footnotesTemplate }) => ({
    footnoteTemplate,
    footnotesTemplate,
    footnotesExampleTemplate: (footnote14, footnote15, footnotes) => html`
      <p>
        In juli 2018 is er een quick scan natuur uitgevoerd voor het plangebied${footnoteTemplate(footnote14)}. Dit
        onderzoek is een actualisatie van een eerder door Blom Ecologie uitgevoerd oriënterend onderzoek dat vanwege de
        datum van uitvoering haar geldigheid was verloren. In januari 2019 is dit onderzoek
        aangevuld${footnoteTemplate(footnote15)} met vrije kavel, welke eveneens onderdeel zijn van dit bestemmingsplan.
      </p>
      ${footnotesTemplate(footnotes)}
    `,
  }),
});
