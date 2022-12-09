import { storiesOf } from "@storybook/web-components";
import { storiesOfAlert, StoryRoot } from "dso-toolkit";

import cssReadme from "dso-toolkit/src/components/alert/readme.md";
import coreReadme from "@dso-toolkit/core/src/components/alert/readme.md";

import { templateContainer } from "../../templates";
import { alertWithHeadingsContent, errorMessage, infoMessage, successMessage, warningMessage } from "./alert.content";

storiesOfAlert({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ alertTemplate }, templates) => ({
    alertTemplate,
    errorMessage: errorMessage(templates),
    infoMessage: infoMessage(templates),
    successMessage,
    warningMessage,
    alertWithHeadingsContent,
  }),
});

storiesOfAlert({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ alertTemplate }, templates) => ({
    alertTemplate,
    errorMessage: errorMessage(templates),
    infoMessage: infoMessage(templates),
    successMessage,
    warningMessage,
    alertWithHeadingsContent,
  }),
});
