import { componentArgs } from "../../storybook";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";
import { documentListContent } from '../document-list/document-list.content';
import { tiles } from "../tile-grid/tile-grid.content";
import { Tile } from "../tile/tile.models";
import { viewerGridArgTypes, ViewerGridArgs, viewerGridDocumentHeaderArgs, ViewerGridDocumentHeaderArgs } from "./viewer-grid.args";
import { ViewerGrid, ViewerGridDocumentHeaderProperties} from "./viewer-grid.models";

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
  documentHeaderExampleTemplate: (ViewerGridDocumentHeaderProperties: ViewerGridDocumentHeaderProperties) => TemplateFnReturnType;
  documentListExampleTemplate: (documentList: typeof documentListContent) => TemplateFnReturnType;
}

export function storiesOfViewerGrid<Implementation, Templates, TemplateFnReturnType>(storiesOfArguments: StoriesOfArguments<Implementation, Templates, TemplateFnReturnType, ViewerGridTemplates<TemplateFnReturnType>>) {
  return storiesOfFactory('Viewer Grid', storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: viewerGridArgTypes,
      layout: "fullscreen",
      controls: {
        hideNoControlsWarning: true
      }
    });

    stories.add(
      'Viewer Grid',
      templateMapper<ViewerGridArgs>((args, { viewerGridTemplate, example }) => viewerGridTemplate({
        dsoCloseOverlay: args.dsoCloseOverlay,
        dsoFilterpanelApply: args.dsoFilterpanelApply,
        dsoFilterpanelCancel: args.dsoFilterpanelCancel,
        filterpanelOpen: args.filterpanelOpen,
        dsoMainSizeChange: args.dsoMainSizeChange,
        initialMainSize: args.initialMainSize,
        overlayOpen: args.overlayOpen,
        main: example.main,
        map: example.map,
        filterpanel: example.filterpanel,
        overlay: example.overlay
      })),
      {
        args: componentArgs<Pick<ViewerGridArgs, 'filterpanelOpen' | 'overlayOpen'>>({
          filterpanelOpen: false,
          overlayOpen: false
        })
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
      templateMapper<ViewerGridDocumentHeaderArgs>((args, { documentHeaderExampleTemplate }) => documentHeaderExampleTemplate({
        documentHeaderFeaturesOpen: args.documentHeaderFeaturesOpen,
        documentHeaderFeatureAction: args.documentHeaderFeatureAction,
        documentHeaderStatusOpen: args.documentHeaderStatusOpen
      })),
      {
        args: componentArgs<Pick<ViewerGridDocumentHeaderArgs, 'documentHeaderFeaturesOpen' | 'documentHeaderStatusOpen'>>({
          documentHeaderFeaturesOpen: false,
          documentHeaderStatusOpen: false
        }),
        argTypes: viewerGridDocumentHeaderArgs
      }
    );

    stories.add(
      'Voorbeeldpagina "Document list"',
      templateMapper((_args, { documentListExampleTemplate }) => documentListExampleTemplate(documentListContent))
    );
  });
}
