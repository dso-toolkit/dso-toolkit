import { StoriesOfArguments, storiesOfFactory, componentArgs } from "../../storybook/index.js";

import { TabsArgs, tabsArgsMapper, tabsArgTypes } from "./tabs.args.js";
import { Tabs } from "./tabs.models.js";

export interface TabsTemplates<TemplateFnReturnType> {
  tabsTemplate: (tabsProperties: Tabs) => TemplateFnReturnType;
}

export function storiesOfTabs<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    TabsTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Tabs", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: tabsArgTypes,
    });

    const template = templateMapper<TabsArgs>((args, { tabsTemplate }) => tabsTemplate(tabsArgsMapper(args)));

    stories.add("default", template, {
      args: componentArgs<TabsArgs>({
        items: [
          {
            label: "Zoek op adres",
            id: "tabitem-1",
            modifiers: "active",
          },
          {
            label: "Postcode en huisnummer",
            id: "tabitem-2",
          },
          {
            label: "Kadastraal nummer",
            id: "tabitem-3",
          },
          {
            label: "Coordinaten",
            id: "tabitem-4",
          },
        ],
      }),
    });

    stories.add("inactief", template, {
      args: componentArgs<TabsArgs>({
        items: [
          {
            label: "Zoek op adres",
            id: "tabitem-1",
          },
          {
            label: "Postcode en huisnummer",
            id: "tabitem-2",
            modifiers: "active",
          },
          {
            label: "Kadastraal nummer",
            id: "tabitem-3",
          },
          {
            label: "Coordinaten",
            id: "tabitem-4",
            modifiers: "disabled",
          },
        ],
      }),
    });

    return stories;
  });
}
