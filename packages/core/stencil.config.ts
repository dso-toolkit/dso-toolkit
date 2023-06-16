import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import { reactOutputTarget } from "@stencil/react-output-target";
import { angularOutputTarget } from "@stencil/angular-output-target";
import { inlineSvg } from "stencil-inline-svg";

export const config: Config = {
  namespace: "dso-toolkit",
  devServer: {
    port: 45333,
  },
  plugins: [
    inlineSvg(),
    sass({
      includePaths: ["../../node_modules"],
    }),
  ],
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: "@dso-toolkit/core",
      customElementsDir: "dist/components",
      includeImportCustomElements: true,
      directivesProxyFile: "../../angular-workspace/projects/component-library/src/lib/stencil-generated/components.ts",
      directivesArrayFile: "../../angular-workspace/projects/component-library/src/lib/stencil-generated/index.ts",
    }),
    reactOutputTarget({
      componentCorePackage: "@dso-toolkit/core",
      customElementsDir: "dist/components",
      includeImportCustomElements: true,
      proxiesFile: "../react/src/components.ts",
    }),
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "dist-custom-elements",
      customElementsExportBehavior: "single-export-module",
      copy: [
        {
          src: "../scripts/custom-elements",
          dest: "dist/components",
          warn: true,
        },
      ],
    },
    {
      type: "docs-readme",
    },
  ],
};
