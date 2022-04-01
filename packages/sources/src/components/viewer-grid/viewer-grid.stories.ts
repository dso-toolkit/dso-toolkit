import {
  bindTemplate,
  componentArgs,
  StorybookParameters,
} from "../../stories-helpers";

import {
  viewerGridDemoArgsMapper,
  viewerGridArgTypes,
  ViewerGridArgs,
} from "./viewer-grid.args";

import { ViewerGridDemoProperties, TilesGridDemoProperties } from "./viewer-grid.models";

export interface ViewerGridParameters<TemplateFnReturnType> {
  viewerGridDemoTemplate: (
    viewerGridDemoProperties: ViewerGridDemoProperties
  ) => TemplateFnReturnType;
  tilesGridDemoTemplate: (
    tilesGridDemoProperties: TilesGridDemoProperties
  ) => TemplateFnReturnType;
}

export function storiesOfViewerGrid<TemplateFnReturnType>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  { viewerGridDemoTemplate, tilesGridDemoTemplate }: ViewerGridParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(
    viewerGridDemoArgsMapper,
    viewerGridDemoTemplate
  );

  const tileTemplate = bindTemplate(
    viewerGridDemoArgsMapper,
    tilesGridDemoTemplate
  );

  const stories = storiesOf("Viewer Grid", mainModule).addParameters({
    layout: "fullscreen",
    docs: {
      page: readme,
    },
    args: componentArgs<
      Pick<ViewerGridArgs, "filterpanelOpen" | "overlayOpen" | "noOverlay" | "documentHeaderFeaturesOpen">
    >({
      filterpanelOpen: false,
      overlayOpen: false,
      noOverlay: false,
      documentHeaderFeaturesOpen: true,
    }),
    argTypes: viewerGridArgTypes,
  });

  stories.add("Viewer Grid", template, {
    args: componentArgs<
      Pick<ViewerGridArgs, "overlayOpen" | "noOverlay" | "documentHeaderFeaturesOpen">
    >({
      overlayOpen: false,
      noOverlay: false,
      documentHeaderFeaturesOpen: true,
    }),
  });

  stories.add("Tile grid", tileTemplate, {
    args: componentArgs<
      Pick<ViewerGridArgs, "overlayOpen" | "noOverlay" | "documentHeaderFeaturesOpen">
    >({
      overlayOpen: false,
      noOverlay: false,
      documentHeaderFeaturesOpen: false
    }),
  });
}
