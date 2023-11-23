import { storiesOfListButton, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/list-button/readme.md?raw";
import coreReadme from "@dso-toolkit/core/src/components/list-button/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfListButton({
  parameters: {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ listButtonTemplate }) => ({ listButtonTemplate }),
});

storiesOfListButton({
  parameters: {
    storiesOf,
    module,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ listButtonTemplate }) => {
    type ListButtonConnector = (
      parameters: Parameters<
        ReturnType<Parameters<typeof storiesOfListButton>[0]["storyTemplates"]>["listButtonTemplate"]
      >,
    ) => Parameters<typeof listButtonTemplate>[0];

    const listButtonConnector: ListButtonConnector = ([props]) => ({
      ...props,
      dsoCountChange(e) {
        this.count = e.detail.count;
        props.dsoCountChange?.(e);
      },
      dsoSelectedChange(e) {
        this.checked = e.detail.checked;
        props.dsoSelectedChange?.(e);
      },
    });

    return {
      listButtonTemplate: (props) => listButtonTemplate(listButtonConnector([props])),
    };
  },
});
