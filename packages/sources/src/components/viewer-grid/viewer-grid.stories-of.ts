import { Args } from "@storybook/addons";
import {
  componentArgs,
  createStories,
  StorybookParameters,
} from "../../storybook";
import { documentListContent } from '../document-list/document-list.content';
import { tiles } from "../tile-grid/tile-grid.content";
import { Tile } from "../tile/tile.models";
import { viewerGridArgs, ViewerGridArgs, viewerGridDocumentHeaderArgs, ViewerGridDocumentHeaderArgs } from "./viewer-grid.args";
import { ViewerGrid, ViewerGridDocumentHeaderProperties} from "./viewer-grid.models";

export interface ViewerGridParameters<TemplateFnReturnType> {
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

export function storiesOfViewerGrid<TemplateFnReturnType>(
  parameters: StorybookParameters,
  { viewerGridTemplate, example, tilesExampleTemplate, filterblokExampleTemplate, documentHeaderExampleTemplate, documentListExampleTemplate }: ViewerGridParameters<TemplateFnReturnType>
) {
  const stories = createStories('Viewer Grid', parameters, {})
    .addParameters({
      layout: "fullscreen",
      controls: {
        hideNoControlsWarning: true
      }
    });

  stories.add('Viewer Grid', (a: Args) => {
    const args = a as ViewerGridArgs;

    return viewerGridTemplate({
      closeOverlay: args.onDsoCloseOverlay,
      filterpanelApply: args.onDsoFilterpanelApply,
      filterpanelCancel: args.onDsoFilterpanelCancel,
      filterpanelOpen: args.filterpanelOpen,
      mainSizeChange: args.onDsoMainSizeChange,
      initialMainSize: args.initialMainSize,
      overlayOpen: args.overlayOpen,
      main: example.main,
      map: example.map,
      filterpanel: example.filterpanel,
      overlay: example.overlay
    });
  }, {
    args: componentArgs<Pick<ViewerGridArgs, 'filterpanelOpen' | 'overlayOpen'>>({
      filterpanelOpen: false,
      overlayOpen: false
    }),
    argTypes: viewerGridArgs
  });

  stories.add('Voorbeeldpagina "Tiles"', () => {
    return tilesExampleTemplate(tiles);
  });

  stories.add('Voorbeeldpagina "Filterblok"', () => {
    return filterblokExampleTemplate();
  });

  stories.add('Voorbeeldpagina "Document header"', (a: Args) => {
    const args = a as ViewerGridDocumentHeaderArgs;

    return documentHeaderExampleTemplate({
      documentHeaderFeaturesOpen: args.documentHeaderFeaturesOpen,
      documentHeaderFeatureAction: args.documentHeaderFeatureAction,
      documentHeaderStatusOpen: args.documentHeaderStatusOpen
    });
  }, {
    args: componentArgs<Pick<ViewerGridDocumentHeaderArgs, 'documentHeaderFeaturesOpen' | 'documentHeaderStatusOpen'>>({
      documentHeaderFeaturesOpen: false,
      documentHeaderStatusOpen: false
    }),
    argTypes: viewerGridDocumentHeaderArgs
  });

  stories.add('Voorbeeldpagina "Document list"', () => {
    return documentListExampleTemplate(documentListContent);
  });
}
