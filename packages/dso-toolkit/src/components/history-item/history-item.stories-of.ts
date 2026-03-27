import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { HistoryItemArgs, historyItemArgTypes, historyItemArgsMapper } from "./history-item.args.js";
import { HistoryItem } from "./history-item.models.js";

type HistoryItemStory = StoryObj<HistoryItemArgs, Renderer>;

interface HistoryItemStories {
  Besluit: HistoryItemStory;
  InWerking: HistoryItemStory;
  Ontwerp: HistoryItemStory;
  TijdelijkRegelingdeel: HistoryItemStory;
  TijdelijkRegelingdeelBesluit: HistoryItemStory;
  Waarschuwing: HistoryItemStory;
}

interface HistoryItemStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  HistoryItemTemplates<TemplateFnReturnType>
> {}

interface HistoryItemTemplates<TemplateFnReturnType> {
  historyItemTemplate: (historyItemProperties: HistoryItem) => TemplateFnReturnType;
}

export function historyItemMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  HistoryItemArgs
> {
  return {
    argTypes: historyItemArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function historyItemStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: HistoryItemStoriesParameters<Implementation, Templates, TemplateFnReturnType>): HistoryItemStories {
  return {
    InWerking: {
      args: {
        date: "20-07-2025",
        statusMessage: "Inzage tot 20-10-2025",
        type: "in-werking",
        title: '"Voorbeschermingsregels hyperscale datacentra" opgenomen in plan',
        warning: "Waarschuwing message",
        explanation: "Uitleg message",
        dsoClick: fn(),
      },
      render: templateContainer.render(storyTemplates, (args, { historyItemTemplate }) =>
        historyItemTemplate(historyItemArgsMapper(args)),
      ),
    },
    Besluit: {
      args: {
        date: "20-07-2025",
        statusMessage: "Inzage tot 20-10-2025",
        type: "besluit",
        title: '"Voorbeschermingsregels hyperscale datacentra" opgenomen in plan',
        dsoClick: fn(),
      },
      render: templateContainer.render(storyTemplates, (args, { historyItemTemplate }) =>
        historyItemTemplate(historyItemArgsMapper(args)),
      ),
    },
    TijdelijkRegelingdeel: {
      args: {
        date: "20-07-2025",
        statusMessage: "Inzage tot 20-10-2025",
        type: "tijdelijk-regelingdeel",
        title: '"Voorbeschermingsregels hyperscale datacentra" opgenomen in plan',
        dsoClick: fn(),
      },
      render: templateContainer.render(storyTemplates, (args, { historyItemTemplate }) =>
        historyItemTemplate(historyItemArgsMapper(args)),
      ),
    },
    TijdelijkRegelingdeelBesluit: {
      args: {
        date: "20-07-2025",
        statusMessage: "Inzage tot 20-10-2025",
        type: "tijdelijk-regelingdeel-besluit",
        title: '"Voorbeschermingsregels hyperscale datacentra" opgenomen in plan',
        dsoClick: fn(),
      },
      render: templateContainer.render(storyTemplates, (args, { historyItemTemplate }) =>
        historyItemTemplate(historyItemArgsMapper(args)),
      ),
    },
    Waarschuwing: {
      args: {
        date: "20-07-2025",
        statusMessage: "Inzage tot 20-10-2025",
        type: "waarschuwing",
        dsoClick: fn(),
      },
      render: templateContainer.render(storyTemplates, (args, { historyItemTemplate }) =>
        historyItemTemplate(historyItemArgsMapper(args)),
      ),
    },
    Ontwerp: {
      args: {
        date: "20-07-2025",
        statusMessage: "Inzage tot 20-10-2025",
        type: "ontwerp",
        title: '"Voorbeschermingsregels hyperscale datacentra" opgenomen in plan',
        dsoClick: fn(),
      },
      render: templateContainer.render(storyTemplates, (args, { historyItemTemplate }) =>
        historyItemTemplate(historyItemArgsMapper(args)),
      ),
    },
  };
}
