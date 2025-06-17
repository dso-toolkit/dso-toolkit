import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { componentArgs } from "../../storybook";
import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { ViewerGridArgs, viewerGridArgTypes, viewerGridArgsMapper } from "./viewer-grid.args.js";
import { ViewerGrid } from "./viewer-grid.models.js";

type ViewerGridStory = StoryObj<ViewerGridArgs, Renderer>;

interface ViewerGridStories {
  ViewerGrid: ViewerGridStory;
  FilterPanel: ViewerGridStory;
  DocumentPanel: ViewerGridStory;
}

interface ViewerGridStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ViewerGridTemplates<TemplateFnReturnType>
  > {}

export interface ViewerGridTemplates<TemplateFnReturnType> {
  viewerGridTemplate: (viewerGridProperties: ViewerGrid<TemplateFnReturnType>) => TemplateFnReturnType;
  example: {
    topBar?: TemplateFnReturnType;
    main: (mainExpanded: boolean) => TemplateFnReturnType;
    map: TemplateFnReturnType;
    documentPanel: TemplateFnReturnType;
    filterPanel: TemplateFnReturnType;
    overlay: TemplateFnReturnType;
  };
}

export function viewerGridMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ViewerGridArgs
> {
  return {
    argTypes: viewerGridArgTypes,
    parameters: {
      layout: "fullscreen",
      controls: {
        hideNoControlsWarning: true,
      },
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function viewerGridStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ViewerGridStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ViewerGridStories {
  return {
    ViewerGrid: {
      args: componentArgs<
        Pick<
          ViewerGridArgs,
          | "mainSize"
          | "filterPanelOpen"
          | "overlayOpen"
          | "documentPanelOpen"
          | "documentPanelSize"
          | "mainPanelExpanded"
          | "mainPanelHidden"
          | "activeTab"
        >
      >({
        mainSize: "large",
        filterPanelOpen: false,
        overlayOpen: false,
        documentPanelOpen: false,
        documentPanelSize: "small",
        mainPanelExpanded: true,
        mainPanelHidden: false,
        activeTab: "search",
      }),
      render: templateContainer.render(storyTemplates, (args, { viewerGridTemplate, example }) =>
        viewerGridTemplate(viewerGridArgsMapper(args, example)),
      ),
    },
    FilterPanel: {
      args: componentArgs<
        Pick<
          ViewerGridArgs,
          | "mainSize"
          | "filterPanelTitle"
          | "filterPanelOpen"
          | "overlayOpen"
          | "documentPanelOpen"
          | "documentPanelSize"
          | "mainPanelExpanded"
          | "mainPanelHidden"
          | "activeTab"
        >
      >({
        mainSize: "medium",
        filterPanelTitle: "Titel van het filter paneel",
        filterPanelOpen: true,
        overlayOpen: false,
        documentPanelOpen: false,
        documentPanelSize: "medium",
        mainPanelExpanded: true,
        mainPanelHidden: false,
        activeTab: "search",
      }),
      render: templateContainer.render(storyTemplates, (args, { viewerGridTemplate, example }) =>
        viewerGridTemplate(viewerGridArgsMapper(args, example)),
      ),
    },
    DocumentPanel: {
      args: componentArgs<
        Pick<
          ViewerGridArgs,
          | "mainSize"
          | "filterPanelOpen"
          | "overlayOpen"
          | "documentPanelOpen"
          | "documentPanelSize"
          | "mainPanelExpanded"
          | "mainPanelHidden"
          | "activeTab"
        >
      >({
        mainSize: "large",
        filterPanelOpen: false,
        overlayOpen: false,
        documentPanelOpen: true,
        documentPanelSize: "medium",
        mainPanelExpanded: false,
        mainPanelHidden: true,
        activeTab: "document",
      }),
      render: templateContainer.render(storyTemplates, (args, { viewerGridTemplate, example }) =>
        viewerGridTemplate(viewerGridArgsMapper(args, example)),
      ),
    },
  };
}
