import { storiesOfSelectable } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

const infoRichContent = (
  <div className="dso-rich-content" slot="info">
    <p>Rijke inhoud</p>
    <p>Ziet er zo uit</p>
    <ul>
      <li>Lijstjes</li>
    </ul>
    <p>Kan allemaal</p>
  </div>
);

storiesOfSelectable({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ selectableTemplate }) => ({
    selectableTemplate,
    infoRichContent,
  }),
});
