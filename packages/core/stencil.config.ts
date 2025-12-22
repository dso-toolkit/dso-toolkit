import { ValueAccessorConfig, angularOutputTarget } from "@stencil/angular-output-target";
import { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";
import { sass } from "@stencil/sass";

import { inlineSvg } from "./scripts/inline-svg";

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['dso-selectable[type="checkbox"]'],
    event: "dsoChange",
    targetAttr: "checked",
    type: "boolean",
  },
];

export const config: Config = {
  namespace: "dso-toolkit",
  tsconfig: process.env.CI ? "tsconfig.json" : "tsconfig.local.json",
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
      outputType: "standalone",
      directivesProxyFile: "../../angular-workspace/projects/component-library/src/lib/stencil-generated/components.ts",
      directivesArrayFile: "../../angular-workspace/projects/component-library/src/lib/stencil-generated/index.ts",
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    reactOutputTarget({
      customElementsDir: "dist/components",
      outDir: "../react/src",
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
      type: "dist-custom-elements",
      customElementsExportBehavior: "bundle",
      dir: "dist/bundle",
      minify: false,
      externalRuntime: false,
    },
    {
      type: "docs-readme",
      strict: true,
    },
    {
      type: "docs-vscode",
      file: "vscode-data.json",
    },
    {
      type: "docs-json",
      strict: true,
      file: "docs.json",
    },
  ],
};
