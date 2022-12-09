import { DecoratorFunction } from "@storybook/addons";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";
import { HighlightBox } from "../highlight-box/highlight-box.models.js";
import { Tile } from "../tile/tile.models.js";
import { Whitebox } from "../whitebox/whitebox.models.js";

import { tiles, whiteboxes, highlightBoxes } from "./row-equal-heights.content.js";

export interface RowEqualHeightsTemplates<TemplateFnReturnType> {
  highlightBoxExample: (highlightboxes: HighlightBox<string>[]) => TemplateFnReturnType;
  tileExample: (tiles: Tile[]) => TemplateFnReturnType;
  whiteboxExample: (whiteboxes: Whitebox[]) => TemplateFnReturnType;
}

interface RowEqualHeightsParameters<TemplateFnReturnType> {
  decorator: DecoratorFunction<TemplateFnReturnType>;
}

export function storiesOfRowEqualHeights<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    RowEqualHeightsTemplates<TemplateFnReturnType>
  >,
  { decorator }: RowEqualHeightsParameters<TemplateFnReturnType>
) {
  return storiesOfFactory("Row Equal Heights", storiesOfArguments, (stories, templateMapper) => {
    stories
      .addParameters({
        controls: {
          hideNoControlsWarning: true,
        },
      })
      .addDecorator(decorator);

    stories.add(
      "highlight boxes",
      templateMapper((_args, { highlightBoxExample }) => highlightBoxExample(highlightBoxes))
    );

    stories.add(
      "tiles",
      templateMapper((_args, { tileExample }) => tileExample(tiles))
    );

    stories.add(
      "whiteboxes",
      templateMapper((_args, { whiteboxExample }) => whiteboxExample(whiteboxes))
    );

    return stories;
  });
}
