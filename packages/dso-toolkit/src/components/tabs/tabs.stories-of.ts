import { ComponentAnnotations, Renderer } from "@storybook/types";

import { TabsArgs, tabsArgsMapper, tabsArgTypes } from "./tabs.args.js";
import { Tabs } from "./tabs.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

type TabsStory<TemplateFnReturnType> = StoryObj<TabsArgs<TemplateFnReturnType>, Renderer>;

interface TabsStories<TemplateFnReturnType> {
  AsAnchors: TabsStory<TemplateFnReturnType>;
  AsAnchorsDisabled: TabsStory<TemplateFnReturnType>;
  AsButtons: TabsStory<TemplateFnReturnType>;
  AsButtonsDisabled: TabsStory<TemplateFnReturnType>;
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
  const render = templateContainer.render(storyTemplates, (args: TabsArgs<TemplateFnReturnType>, { tabsTemplate }) =>
    tabsTemplate(tabsArgsMapper(args)),
  );
  return {
    AsAnchors: {
      args: {
        items: [
          {
            label: "Zoek op adres",
            identifier: "tabitem-1",
            modifiers: "active",
            href: "/adres",
          },
          {
            label: "Postcode en huisnummer",
            href: "/postcode",
            identifier: "tabitem-2",
          },
          {
            label: "Kadastraal nummer",
            identifier: "tabitem-3",
            href: "/kadastraal",
          },
          {
            label: "Coördinaten",
            identifier: "tabitem-4",
            href: "/coordinaten",
          },
        ],
        content: "Inhoud Zoek op adres",
      },
      render,
    },
    AsAnchorsDisabled: {
      args: {
        items: [
          {
            label: "Zoek op adres",
            identifier: "tabitem-1",
            href: "/adres",
          },
          {
            label: "Postcode en huisnummer",
            href: "/postcode",
            modifiers: "active",
            identifier: "tabitem-2",
          },
          {
            label: "Kadastraal nummer",
            identifier: "tabitem-3",
            href: "/kadastraal",
          },
          {
            label: "Coördinaten",
            identifier: "tabitem-4",
            href: "/coordinaten",
            modifiers: "disabled",
          },
        ],
        content: "Inhoud Postcode en huisnummer",
      },
      render,
    },
    AsButtons: {
      args: {
        items: [
          {
            label: "Zoek op adres",
            identifier: "tabitem-1",
          },
          {
            label: "Postcode en huisnummer",
            identifier: "tabitem-2",
          },
          {
            label: "Kadastraal nummer",
            identifier: "tabitem-3",
            modifiers: "active",
          },
          {
            label: "Coördinaten",
            identifier: "tabitem-4",
          },
        ],
        content: "Inhoud Kadastraal nummer",
      },
      render,
    },
    AsButtonsDisabled: {
      args: {
        items: [
          {
            label: "Zoek op adres",
            identifier: "tabitem-1",
            modifiers: "disabled",
          },
          {
            label: "Postcode en huisnummer",
            identifier: "tabitem-2",
          },
          {
            label: "Kadastraal nummer",
            identifier: "tabitem-3",
            modifiers: "disabled",
          },
          {
            label: "Coördinaten",
            identifier: "tabitem-4",
            modifiers: "active",
          },
        ],
        content: "Inhoud Coördinaten",
      },
      render,
    },
  };
}
