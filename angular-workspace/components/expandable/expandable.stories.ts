import { type Meta } from "@storybook/web-components";
import { ExpandableArgs, expandableMeta, expandableStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { expandableContent } from "./expandable.content";

const meta: Meta<ExpandableArgs> = {
  ...expandableMeta({ readme }),
  title: "Expandable",
};

export default meta;

const { Default, WithAnimation } = expandableStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { expandableTemplate } = templates;

    return {
      expandableTemplate,
      expandableContent,
    };
  },
  /* TODO: Hoi Thomas, je zult tegen deze Todo aan gaan lopen en ik heb nogal wat moeite om de typeringen van de
     decorators in de angular-workspace. Dit is nog niet zo netjes, maar zaols ik het hier doe werkt het runtime.
     Wanneer de decorator uit expandable.decorators geïmporteerd wordt dan matcht de typering
     `Addon_DecoratorFunction<StoryFnAngularReturnType>` met de typering `ExpandableDecorator<TemplateFnReturnType>`
     uit `expandableStories`.
  */
  decorator: (story) => {
    // @ts-expect-error on story(): TS2339: Property props/template does not exist on type `unknown`
    const { props, template } = story();

    return {
      props,
      template: `
      <span>toggle open control in the controls panel to expand/collapse.<span>
      ${template}

      <style>
        dso-expandable[open],
        dso-expandable:not(.dso-hide) {
          border: 1px solid #000;
        }
      </style>
    `,
    };
  },
});

export { Default, WithAnimation };
