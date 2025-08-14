import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { TabsArgs, tabsArgTypes, tabsArgsMapper } from "./tabs.args.js";
import { Tabs } from "./tabs.models.js";

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
    args: {
      dsoTabSwitch: fn(),
    },
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
            modifier: "active",
            href: "/adres",
          },
          {
            label: "Postcode en huisnummer",
            href: "/postcode",
          },
          {
            label: "Kadastraal nummer",
            href: "/kadastraal",
          },
          {
            label: "Coördinaten",
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
            href: "/adres",
          },
          {
            label: "Postcode en huisnummer",
            href: "/postcode",
            modifier: "active",
          },
          {
            label: "Kadastraal nummer",
            href: "/kadastraal",
          },
          {
            label: "Coördinaten",
            href: "/coordinaten",
            modifier: "disabled",
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
          },
          {
            label: "Postcode en huisnummer",
          },
          {
            label: "Kadastraal nummer",
            modifier: "active",
          },
          {
            label: "Coördinaten",
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
            modifier: "disabled",
          },
          {
            label: "Postcode en huisnummer",
          },
          {
            label: "Kadastraal nummer",
            modifier: "disabled",
          },
          {
            label: "Coördinaten",
            modifier: "active",
          },
        ],
        content: "Inhoud Coördinaten",
      },
      render,
    },
  };
}
