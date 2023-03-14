import { StoriesOfArguments, storiesOfFactory, componentArgs } from "../../storybook/index.js";
import { documentListContent } from "../document-list/document-list.content.js";
import { tiles } from "../tile-grid/tile-grid.content.js";
import { Tile } from "../tile/tile.models.js";
import {
  viewerGridArgTypes,
  ViewerGridArgs,
  viewerGridDocumentHeaderArgs,
  ViewerGridDocumentHeaderArgs,
  viewerGridArgsMapper,
} from "./viewer-grid.args.js";
import { ViewerGrid, ViewerGridDocumentHeaderProperties } from "./viewer-grid.models.js";

export interface ViewerGridTemplates<TemplateFnReturnType> {
  viewerGridTemplate: (viewerGridProperties: ViewerGrid<TemplateFnReturnType>) => TemplateFnReturnType;
  example: {
    main: TemplateFnReturnType;
    map: TemplateFnReturnType;
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
        viewerGridTemplate({
          ...viewerGridArgsMapper(args),
          main: example.main,
          map: example.map,
          filterpanel: example.filterpanel,
          overlay: example.overlay,
        })
      ),
      {
        argTypes: viewerGridArgTypes,
        args: componentArgs<Pick<ViewerGridArgs, "filterpanelOpen" | "overlayOpen">>({
          filterpanelOpen: false,
          overlayOpen: false,
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
