import { ComponentAnnotations, Renderer } from "@storybook/types";

import { TabsArgs, tabsArgsMapper, tabsArgTypes } from "./tabs.args.js";
import { Tabs } from "./tabs.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

type TabsStory<TemplateFnReturnType> = StoryObj<TabsArgs<TemplateFnReturnType>, Renderer>;

interface TabsStories<TemplateFnReturnType> {
  Default: TabsStory<TemplateFnReturnType>;
  Inactief: TabsStory<TemplateFnReturnType>;
}

interface TabsStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, TabsTemplates<TemplateFnReturnType>> {}

interface TabsTemplates<TemplateFnReturnType> {
  tabsTemplate: (tabsProperties: Tabs<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function tabsMeta<TRenderer extends Renderer, TemplateFnReturnType>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer, TabsArgs<TemplateFnReturnType>> {
  return {
    argTypes: tabsArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function tabsStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: TabsStoriesParameters<Implementation, Templates, TemplateFnReturnType>): TabsStories<TemplateFnReturnType> {
  return {
    Default: {
      args: {
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
      },
      render: templateContainer.render(storyTemplates, (args, { tabsTemplate }) => tabsTemplate(tabsArgsMapper(args))),
    },
    Inactief: {
      args: {
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
      },
      render: templateContainer.render(storyTemplates, (args, { tabsTemplate }) => tabsTemplate(tabsArgsMapper(args))),
    },
  };
}
