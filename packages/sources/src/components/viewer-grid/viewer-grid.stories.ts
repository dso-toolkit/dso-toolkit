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
import { ViewerGridDefaultDemoProperties, ViewerGridThemesDemoProperties } from "./viewer-grid.models";

export interface ViewerGridParameters<TemplateFnReturnType> {
  viewerGridDefaultDemoTemplate: (
    viewerGridDemoProperties: ViewerGridDefaultDemoProperties
  ) => TemplateFnReturnType,
  viewerGridThemesDemoTemplate: (
    viewerGridDemoProperties: ViewerGridThemesDemoProperties
  ) => TemplateFnReturnType;
}

export function storiesOfViewerGrid<TemplateFnReturnType>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  { viewerGridDefaultDemoTemplate, viewerGridThemesDemoTemplate }: ViewerGridParameters<TemplateFnReturnType>
) {
  const defaultDemoTemplate = bindTemplate(
    viewerGridDemoArgsMapper,
    viewerGridDefaultDemoTemplate
  );

  const themesDemoTemplate = bindTemplate(
    viewerGridDemoArgsMapper,
    viewerGridThemesDemoTemplate
  );

  const stories = storiesOf("Viewer Grid", mainModule).addParameters({
    layout: "fullscreen",
    docs: {
      page: readme,
    },
    argTypes: viewerGridArgTypes,
  });

  stories.add('default', defaultDemoTemplate, {
    args: componentArgs<
      Pick<ViewerGridArgs, "overlayOpen" | "noOverlay" | "documentHeaderFeaturesOpen">
    >({
      overlayOpen: false,
      noOverlay: false,
      documentHeaderFeaturesOpen: true,
    }),
  });

  stories.add('themes', themesDemoTemplate, {
    args: componentArgs<
      Pick<ViewerGridArgs, "overlayOpen" | "noOverlay" | "documentHeaderFeaturesOpen">
    >({
      overlayOpen: false,
      noOverlay: false,
      documentHeaderFeaturesOpen: false
    }),
   });
}
