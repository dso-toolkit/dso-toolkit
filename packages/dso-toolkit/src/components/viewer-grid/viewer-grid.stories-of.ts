import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

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

interface ViewerGridStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
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
    args: {
      dsoActiveTabSwitch: fn(),
      dsoMainSizeChangeAnimationEnd: fn(),
      dsoCloseOverlay: fn(),
      dsoCloseFilterPanel: fn(),
      dsoDocumentPanelSizeChange: fn(),
      dsoDocumentPanelSizeChangeAnimationEnd: fn(),
      dsoMainPanelToggle: fn(),
    },
    parameters: {
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
  type ViewerGridStoryArgs = Pick<
    ViewerGridArgs,
    | "mainSize"
    | "filterPanelOpen"
    | "filterPanelTitle"
    | "overlayOpen"
    | "documentPanelOpen"
    | "documentPanelSize"
    | "mainPanelExpanded"
    | "mainPanelHidden"
    | "activeTab"
  >;

  const render = templateContainer.render(storyTemplates, (args: ViewerGridArgs, { viewerGridTemplate, example }) =>
    viewerGridTemplate(viewerGridArgsMapper(args, example)),
  );

  const defaultArgs = componentArgs<ViewerGridStoryArgs>({
    mainSize: "large",
    filterPanelOpen: false,
    filterPanelTitle: "Titel van het filter paneel",
    overlayOpen: false,
    documentPanelOpen: false,
    documentPanelSize: "small",
    mainPanelExpanded: true,
    mainPanelHidden: false,
    activeTab: "search",
  });

  const parameters = { layout: "fullscreen" as const };

  return {
    ViewerGrid: {
      args: defaultArgs,
      render,
      parameters,
    },
    FilterPanel: {
      args: {
        ...defaultArgs,
        mainSize: "medium",
        filterPanelOpen: true,
        documentPanelSize: "medium",
      },
      render,
      parameters,
    },
    DocumentPanel: {
      args: {
        ...defaultArgs,
        documentPanelOpen: true,
        documentPanelSize: "medium",
        mainPanelExpanded: false,
        mainPanelHidden: true,
        activeTab: "document",
      },
      render,
      parameters,
    },
  };
}
