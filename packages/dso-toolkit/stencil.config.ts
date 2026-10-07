import { angularOutputTarget } from "@stencil/angular-output-target";
import { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";
import { sass } from "@stencil/sass";

import { inlineSvg } from "./scripts/inline-svg";
import { dsoToolkitVersion, inlineIcon } from "./scripts/sass-functions";

export const config: Config = {
  namespace: "dso-toolkit",
  tsconfig: process.env.CI ? "tsconfig.json" : "tsconfig.local.json",
  devServer: {
    port: 45333,
  },
  globalStyle: "src/dso.scss",
  // Only affects globalStyle output (dist/dso.css); component-level CSS stays minified.
  minifyCss: false,
  extras: {
    addGlobalStyleToComponents: false,
  },
  plugins: [
    inlineSvg(),
    sass({
      includePaths: ["../../node_modules"],
      functions: {
        "inline-icon-DI-ONLY($name, $color: null)": inlineIcon,
        "dso-toolkit-version()": dsoToolkitVersion,
      },
    }),
  ],
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: "dso-toolkit",
      customElementsDir: "dist/components",
      outputType: "standalone",
      directivesProxyFile: "../../angular-workspace/projects/component-library/src/lib/stencil-generated/components.ts",
      directivesArrayFile: "../../angular-workspace/projects/component-library/src/lib/stencil-generated/index.ts",
      /* Experimental: Enables type-checking and JSDoc in Angular templates via Angular Language Service. */
      inlineProperties: true,
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
    // The OutputTargetDistGlobalStyles type already ships with @stencil/core 4.44.2, but the
    // *runtime* validation (VALID_CONFIG_OUTPUT_TARGETS) rejected it until patched - see
    // patches/@stencil__core@4.44.2.patch. Produces dist/dso.css from globalStyle, unminified
    // and without a sourcemap or an accompanying .min.css (replacing the former gulp build).
    {
      type: "dist-global-styles",
      file: "dist/dso.css",
    },
    {
      type: "copy",
      copy: [
        { src: "../../../README.md", dest: "../README.md" },
        { src: "../../../CHANGELOG.md", dest: "../CHANGELOG.md" },
      ],
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
