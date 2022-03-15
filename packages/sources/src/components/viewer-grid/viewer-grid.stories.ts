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
import { ViewerGridDemoProperties } from "./viewer-grid.models";

export interface ViewerGridParameters<TemplateFnReturnType> {
  viewerGridDemoTemplate: (
    viewerGridDemoProperties: ViewerGridDemoProperties
  ) => TemplateFnReturnType;
}

export function storiesOfViewerGrid<TemplateFnReturnType>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  { viewerGridDemoTemplate }: ViewerGridParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(
    viewerGridDemoArgsMapper,
    viewerGridDemoTemplate
  );

  const stories = storiesOf("Viewer Grid", mainModule).addParameters({
    layout: "fullscreen",
    docs: {
      page: readme,
    },
    args: componentArgs<
      Pick<ViewerGridArgs, "overlayOpen" | "noOverlay" | "documentHeaderFeaturesOpen">
    >({
      overlayOpen: false,
      noOverlay: false,
      documentHeaderFeaturesOpen: true,
    }),
    argTypes: viewerGridArgTypes,
  });

  // stories.add("default", template);

  // stories.add("themes", template);

  stories.add(
    'default',
    template,
    {
      args: {
        themes: false
      }
    }
  );

  stories.add(
    'themes',
    template,
    {
      args: {
        themes: true
      }
    }
  );
}
