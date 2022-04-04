import {
  bindTemplate,
  componentArgs,
  StorybookParameters,
} from "../../stories-helpers";

import { ViewerGridWithSearchResultsArgs, viewerGridWithSearchResultsArgTypes, viewerGridWithSearchResultsDemoArgsMapper, viewerGridWithTilesArgTypes, viewerGridWithTilesDemoArgsMapper } from "./viewer-grid.args";

import { ViewerGridWithSearchResultsProperties, ViewerGridWithTilesProperties } from "./viewer-grid.models";

export interface ViewerGridParameters<TemplateFnReturnType> {
  viewerGridWithSearchResultsDemoTemplate: (
    viewerGridDemoProperties: ViewerGridWithSearchResultsProperties
  ) => TemplateFnReturnType;
  viewerGridWithTilesDemoTemplate: (
    tilesGridDemoProperties: ViewerGridWithTilesProperties
  ) => TemplateFnReturnType;
}

export function storiesOfViewerGrid<TemplateFnReturnType>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  { viewerGridWithSearchResultsDemoTemplate: viewerGridDemoTemplate, viewerGridWithTilesDemoTemplate }: ViewerGridParameters<TemplateFnReturnType>
) {
  const stories = storiesOf("Viewer Grid", mainModule).addParameters({
    layout: "fullscreen",
    docs: {
      page: readme,
    },
    controls: {
      hideNoControlsWarning: true
    }
  });

  stories.add(
    "with search results",
    bindTemplate(viewerGridWithSearchResultsDemoArgsMapper, viewerGridDemoTemplate),
    {
      argTypes: viewerGridWithSearchResultsArgTypes,
      args: componentArgs<
        Pick<ViewerGridWithSearchResultsArgs, "filterpanelOpen" | "overlayOpen" | "noOverlay" | "documentHeaderFeaturesOpen">
      >({
        filterpanelOpen: false,
        overlayOpen: false,
        noOverlay: false,
        documentHeaderFeaturesOpen: true,
      })
    }
  );

  stories.add(
    "with tiles",
    bindTemplate(viewerGridWithTilesDemoArgsMapper, viewerGridWithTilesDemoTemplate),
    {
      argTypes: viewerGridWithTilesArgTypes
    }
  );
}
