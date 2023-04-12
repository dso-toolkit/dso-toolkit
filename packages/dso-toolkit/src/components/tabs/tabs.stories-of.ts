import { StoriesOfArguments, storiesOfFactory, componentArgs } from "../../storybook/index.js";

import { TabsArgs, tabsArgsMapper, tabsArgTypes } from "./tabs.args.js";
import { Tabs } from "./tabs.models.js";

export interface TabsTemplates<TemplateFnReturnType> {
  tabsTemplate: (tabsProperties: Tabs<TemplateFnReturnType>) => TemplateFnReturnType;
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

    const template = templateMapper<TabsArgs<TemplateFnReturnType>>((args, { tabsTemplate }) =>
      tabsTemplate(tabsArgsMapper(args))
    );

    stories.add("default", template, {
      args: componentArgs<TabsArgs<TemplateFnReturnType>>({
        items: [
          {
            label: "Zoek op adres",
            id: "tabitem-1",
            modifiers: "active",
            content: "Inhoud Zoek op adres",
          },
          {
            label: "Postcode en huisnummer",
            id: "tabitem-2",
            content: "Inhoud Postcode en huisnummer",
          },
          {
            label: "Kadastraal nummer",
            id: "tabitem-3",
            content: "Inhoud Kadastraal nummer",
          },
          {
            label: "Coordinaten",
            id: "tabitem-4",
            content: "Inhoud Coordinaten",
          },
        ],
      }),
    });

    stories.add("inactief", template, {
      args: componentArgs<TabsArgs<TemplateFnReturnType>>({
        items: [
          {
            label: "Zoek op adres",
            id: "tabitem-1",
            content: "Inhoud Zoek op adres",
          },
          {
            label: "Postcode en huisnummer",
            id: "tabitem-2",
            modifiers: "active",
            content: "Inhoud Postcode en huisnummer",
          },
          {
            label: "Kadastraal nummer",
            id: "tabitem-3",
            content: "Inhoud Kadastraal nummer",
          },
          {
            label: "Coordinaten",
            id: "tabitem-4",
            modifiers: "disabled",
            content: "Inhoud Coordinaten",
          },
        ],
      }),
    });

    return stories;
  });
}
