import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { html } from "lit-html";

import { LegendGroupArgs, legendGroupArgs, legendGroupArgTypes, legendGroupArgsMapper } from "./legend-group.args.js";
import { LegendGroup } from "./legend-group.models.js";
import { LegendItem } from "../legend-item/legend-item.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

type LegendGroupStory = StoryObj<LegendGroupArgs, Renderer>;

interface LegendGroupStories {
  Default: LegendGroupStory;
}

interface LegendGroupStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  LegendGroupTemplates<TemplateFnReturnType>
> {}

interface LegendGroupTemplates<TemplateFnReturnType> {
  legendGroupTemplate: (legendGroupProperties: LegendGroup<TemplateFnReturnType>) => TemplateFnReturnType;
  legendItemTemplate: (legendItemProperties: LegendItem<TemplateFnReturnType>) => TemplateFnReturnType;
  defaultSymbol: TemplateFnReturnType;
  content: (label: string) => TemplateFnReturnType;
}

export function legendGroupMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  LegendGroupArgs
> {
  return {
    argTypes: legendGroupArgTypes,
    args: legendGroupArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function legendGroupStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: LegendGroupStoriesParameters<Implementation, Templates, TemplateFnReturnType>): LegendGroupStories {
  return {
    Default: {
      render: templateContainer.render(
        storyTemplates,
        (args, { legendGroupTemplate, legendItemTemplate, defaultSymbol, content }) =>
          legendGroupTemplate(
            legendGroupArgsMapper(
              args,
              html`<h3 slot="heading">Geselecteerde kenmerken</h3>` as TemplateFnReturnType,
              html`
                ${legendItemTemplate({
                  content: content("Acculader in werking"),
                  activatable: true,
                  symbol: defaultSymbol,
                })}
                ${legendItemTemplate({
                  content: content("Bomen kappen"),
                  activatable: true,
                  active: true,
                  symbol: defaultSymbol,
                })}
              ` as TemplateFnReturnType,
            ),
          ),
      ),
    },
  };
}
