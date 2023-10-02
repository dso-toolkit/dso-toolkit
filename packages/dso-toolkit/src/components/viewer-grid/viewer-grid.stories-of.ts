import { StoriesOfArguments, storiesOfFactory, componentArgs } from "../../storybook/index.js";
import { documentListContent } from "../document-list/document-list.content.js";
import { tiles } from "../tile-grid/tile-grid.content.js";
import { Tile } from "../tile/tile.models.js";
import {
  viewerGridArgTypes,
  ViewerGridArgs,
  viewerGridArgsMapper,
  viewerGridDocumentHeaderArgs,
  ViewerGridDocumentHeaderArgs,
} from "./viewer-grid.args.js";
import { ViewerGrid, ViewerGridDocumentHeaderProperties } from "./viewer-grid.models.js";

export interface ViewerGridTemplates<TemplateFnReturnType> {
  viewerGridTemplate: (viewerGridProperties: ViewerGrid<TemplateFnReturnType>) => TemplateFnReturnType;
  example: {
    main: TemplateFnReturnType;
    mainExpanded: TemplateFnReturnType;
    map: TemplateFnReturnType;
    documentPanel: TemplateFnReturnType;
    filterpanel: TemplateFnReturnType;
    overlay: TemplateFnReturnType;
  };
  tilesExampleTemplate: (tiles: Tile[]) => TemplateFnReturnType;
  filterblokExampleTemplate: () => TemplateFnReturnType;
  documentHeaderExampleTemplate: (
    ViewerGridDocumentHeaderProperties: ViewerGridDocumentHeaderProperties
  ) => TemplateFnReturnType;
  documentListExampleTemplate: (documentList: typeof documentListContent) => TemplateFnReturnType;
}

export function storiesOfViewerGrid<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ViewerGridTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Viewer Grid", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      layout: "fullscreen",
      controls: {
        hideNoControlsWarning: true,
      },
    });

    stories.add(
      "Viewer Grid",
      templateMapper<ViewerGridArgs>((args, { viewerGridTemplate, example }) =>
        viewerGridTemplate(viewerGridArgsMapper(args, example))
      ),
      {
        argTypes: viewerGridArgTypes,
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
          documentPanelSize: "large",
          mainPanelExpanded: false,
          mainPanelHidden: false,
          vrkActiveTab: "main",
          vdkActiveTab: "search",
        }),
      }
    );

    stories.add(
      "Filterpanel",
      templateMapper<ViewerGridArgs>((args, { viewerGridTemplate, example }) =>
        viewerGridTemplate(viewerGridArgsMapper(args, example))
      ),
      {
        argTypes: viewerGridArgTypes,
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
          documentPanelSize: "large",
          mainPanelExpanded: false,
          mainPanelHidden: false,
          vrkActiveTab: "main",
          vdkActiveTab: "search",
        }),
      }
    );

    stories.add(
      'Voorbeeldpagina "Tiles"',
      templateMapper((_args, { tilesExampleTemplate }) => tilesExampleTemplate(tiles))
    );

    stories.add(
      'Voorbeeldpagina "Filterblok"',
      templateMapper((_args, { filterblokExampleTemplate }) => filterblokExampleTemplate())
    );

    stories.add(
      'Voorbeeldpagina "Document header"',
      templateMapper<ViewerGridDocumentHeaderArgs>((args, { documentHeaderExampleTemplate }) =>
        documentHeaderExampleTemplate({
          documentHeaderFeaturesOpen: args.documentHeaderFeaturesOpen,
          documentHeaderFeatureAction: args.documentHeaderFeatureAction,
          documentHeaderStatusOpen: args.documentHeaderStatusOpen,
          documentHeaderSticky: args.documentHeaderSticky,
        })
      ),
      {
        args: componentArgs<
          Pick<
            ViewerGridDocumentHeaderArgs,
            "documentHeaderFeaturesOpen" | "documentHeaderStatusOpen" | "documentHeaderSticky"
          >
        >({
          documentHeaderFeaturesOpen: false,
          documentHeaderStatusOpen: false,
          documentHeaderSticky: false,
        }),
        argTypes: viewerGridDocumentHeaderArgs,
      }
    );

    stories.add(
      'Voorbeeldpagina "Document list"',
      templateMapper((_args, { documentListExampleTemplate }) => documentListExampleTemplate(documentListContent))
    );

    return stories;
  });
}
