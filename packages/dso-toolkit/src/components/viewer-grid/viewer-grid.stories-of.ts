import { ComponentAnnotations, Renderer } from "@storybook/types";

import {
  ViewerGridArgs,
  viewerGridArgsMapper,
  viewerGridArgTypes,
  viewerGridDocumentHeaderArgs,
  ViewerGridDocumentHeaderArgs,
} from "./viewer-grid.args.js";
import { ViewerGrid, ViewerGridDocumentHeaderProperties } from "./viewer-grid.models.js";

import { documentListContent } from "../document-list/document-list.content.js";
import { Tile } from "../tile";
import { options } from "../advanced-select/advanced-select.content";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { componentArgs } from "../../storybook";
import { MetaOptions } from "../../storybook/meta-options.interface";

type ViewerGridStory = StoryObj<ViewerGridArgs, Renderer>;

interface ViewerGridStories {
  ViewerGrid: ViewerGridStory;
  Filterpanel: ViewerGridStory;
  FilterpanelVDK: ViewerGridStory;
  VoorbeeldpaginaTiles: ViewerGridStory;
  VoorbeeldpaginaFilterblok: ViewerGridStory;
  VoorbeeldpaginaDocumentHeader: StoryObj<ViewerGridDocumentHeaderArgs, Renderer>;
  VoorbeeldpaginaDocumentList: ViewerGridStory;
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
    filterpanel: TemplateFnReturnType;
    overlay: TemplateFnReturnType;
  };
  tilesExampleTemplate: (tiles: Tile[]) => TemplateFnReturnType;
  filterblokExampleTemplate: () => TemplateFnReturnType;
  documentHeaderExampleTemplate: (
    ViewerGridDocumentHeaderProperties: ViewerGridDocumentHeaderProperties,
  ) => TemplateFnReturnType;
  documentListExampleTemplate: (documentList: typeof documentListContent) => TemplateFnReturnType;
  tiles: Tile[];
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
          | "mode"
          | "mainSize"
          | "filterpanelOpen"
          | "overlayOpen"
          | "documentPanelOpen"
          | "documentPanelSize"
          | "mainPanelExpanded"
          | "mainPanelHidden"
          | "vrkActiveTab"
          | "vdkActiveTab"
        >
      >({
        mode: "vrk",
        mainSize: "large",
        filterpanelOpen: false,
        overlayOpen: false,
        documentPanelOpen: false,
        documentPanelSize: "small",
        mainPanelExpanded: false,
        mainPanelHidden: false,
        vrkActiveTab: "main",
        vdkActiveTab: "search",
      }),
      render: templateContainer.render(storyTemplates, (args, { viewerGridTemplate, example }) =>
        viewerGridTemplate(viewerGridArgsMapper(args, example)),
      ),
    },
    Filterpanel: {
      args: componentArgs<
        Pick<
          ViewerGridArgs,
          | "mode"
          | "mainSize"
          | "filterpanelOpen"
          | "overlayOpen"
          | "documentPanelOpen"
          | "documentPanelSize"
          | "mainPanelExpanded"
          | "mainPanelHidden"
          | "vrkActiveTab"
          | "vdkActiveTab"
        >
      >({
        mode: "vrk",
        mainSize: "large",
        filterpanelOpen: true,
        overlayOpen: false,
        documentPanelOpen: false,
        documentPanelSize: "small",
        mainPanelExpanded: false,
        mainPanelHidden: false,
        vrkActiveTab: "main",
        vdkActiveTab: "search",
      }),
      render: templateContainer.render(storyTemplates, (args, { viewerGridTemplate, example }) =>
        viewerGridTemplate(viewerGridArgsMapper(args, example)),
      ),
    },
    FilterpanelVDK: {
      args: componentArgs<
        Pick<
          ViewerGridArgs,
          | "mode"
          | "mainSize"
          | "filterpanelTitle"
          | "filterpanelOpen"
          | "overlayOpen"
          | "documentPanelOpen"
          | "documentPanelSize"
          | "mainPanelExpanded"
          | "mainPanelHidden"
          | "vrkActiveTab"
          | "vdkActiveTab"
        >
      >({
        mode: "vdk",
        mainSize: "medium",
        filterpanelTitle: "Titel van het filter paneel",
        filterpanelOpen: true,
        overlayOpen: false,
        documentPanelOpen: false,
        documentPanelSize: "medium",
        mainPanelExpanded: true,
        mainPanelHidden: false,
        vrkActiveTab: "main",
        vdkActiveTab: "search",
      }),
      render: templateContainer.render(storyTemplates, (args, { viewerGridTemplate, example }) =>
        viewerGridTemplate(viewerGridArgsMapper(args, example)),
      ),
    },
    VoorbeeldpaginaTiles: {
      storyName: 'Voorbeeldpagina "Tiles"',
      render: templateContainer.render(storyTemplates, (_args, { tilesExampleTemplate, tiles }) =>
        tilesExampleTemplate(tiles),
      ),
    },
    VoorbeeldpaginaFilterblok: {
      storyName: 'Voorbeeldpagina "Filterblok"',
      render: templateContainer.render(storyTemplates, (_args, { filterblokExampleTemplate }) =>
        filterblokExampleTemplate(),
      ),
    },
    VoorbeeldpaginaDocumentHeader: {
      storyName: 'Voorbeeldpagina "Document header"',
      argTypes: viewerGridDocumentHeaderArgs,
      args: componentArgs<
        Pick<
          ViewerGridDocumentHeaderArgs,
          | "documentHeaderFeaturesOpen"
          | "documentHeaderSticky"
          | "documentHeaderAdvancedSelect"
          | "documentHeaderAdvancedSelectActiveIndex"
        >
      >({
        documentHeaderFeaturesOpen: false,
        documentHeaderSticky: false,
        documentHeaderAdvancedSelect: {
          options,
        },
        documentHeaderAdvancedSelectActiveIndex: 0,
      }),
      render: templateContainer.render(storyTemplates, (args, { documentHeaderExampleTemplate }) =>
        documentHeaderExampleTemplate({
          documentHeaderFeaturesOpen: args.documentHeaderFeaturesOpen,
          documentHeaderFeatureAction: args.documentHeaderFeatureAction,
          documentHeaderSticky: args.documentHeaderSticky,
          documentHeaderAdvancedSelect: args.documentHeaderAdvancedSelect,
          documentHeaderAdvancedSelectActiveIndex: args.documentHeaderAdvancedSelectActiveIndex,
        }),
      ),
    },
    VoorbeeldpaginaDocumentList: {
      storyName: 'Voorbeeldpagina "Document list"',
      render: templateContainer.render(storyTemplates, (_args, { documentListExampleTemplate }) =>
        documentListExampleTemplate(documentListContent),
      ),
    },
  };
}
