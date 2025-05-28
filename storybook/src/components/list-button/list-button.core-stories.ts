import readme from "@dso-toolkit/core/src/components/list-button/readme.md?raw";
import type { Meta } from "@storybook/web-components";
import { ListButtonArgs, listButtonMeta, listButtonStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<ListButtonArgs> = {
  ...listButtonMeta({ readme }),
  title: "Core/List Button",
};

export default meta;

const { SingleSelect, MultiSelect } = listButtonStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { listButtonTemplate } = templates;

    type ListButtonConnector = (
      parameters: Parameters<
        ReturnType<Parameters<typeof listButtonStories>[0]["storyTemplates"]>["listButtonTemplate"]
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

export { MultiSelect, SingleSelect };
