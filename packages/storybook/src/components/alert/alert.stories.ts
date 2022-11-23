import { storiesOf } from "@storybook/web-components";
import { storiesOfAlert } from "@dso-toolkit/sources/src/components/alert/alert.stories-of";

import cssReadme from "@dso-toolkit/css/src/components/alert/readme.md";
import coreReadme from "@dso-toolkit/core/src/components/alert/readme.md";

import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
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
    successMessage: successMessage,
    warningMessage: warningMessage,
    alertWithHeadingsContent: alertWithHeadingsContent,
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
    successMessage: successMessage,
    warningMessage: warningMessage,
    alertWithHeadingsContent: alertWithHeadingsContent,
  }),
});
