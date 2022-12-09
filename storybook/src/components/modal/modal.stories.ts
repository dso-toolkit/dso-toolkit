import coreReadme from "@dso-toolkit/core/src/components/modal/readme.md";
import cssReadme from "dso-toolkit/src/components/modal/readme.md";
import { storiesOfModal, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import { templateContainer } from "../../templates";
import {
  activeBody,
  activeFooter,
  confirmBody,
  confirmFooter,
  passiveBody,
  passiveFooter,
  loadingBody,
} from "./modal.content";

storiesOfModal({
  parameters: {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ modalTemplate }, templates) => ({
    modalTemplate,
    activeBody: activeBody(),
    activeFooter: activeFooter(templates),
    passiveBody: passiveBody(templates),
    passiveFooter: passiveFooter(templates),
    confirmBody: confirmBody(templates),
    confirmFooter: confirmFooter(templates),
    loadingBody: loadingBody(templates),
  }),
});

storiesOfModal({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ modalTemplate }, templates) => ({
    modalTemplate,
    activeBody: activeBody(),
    activeFooter: activeFooter(templates),
    passiveBody: passiveBody(templates),
    passiveFooter: passiveFooter(templates),
    confirmBody: confirmBody(templates),
    confirmFooter: confirmFooter(templates),
    loadingBody: loadingBody(templates),
  }),
});
