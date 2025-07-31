import type { Diagnostic } from "@stencil/core/internal/stencil-public-compiler";
import { PluginTransformer } from "stencil-inline-svg/dist/declarations";
import { decodeBase64SourceText } from "stencil-inline-svg/dist/util";

interface PluginTransformResultsWithMap {
  code?: string;
  id?: string;
  diagnostics?: Diagnostic[];
  dependencies?: string[];
  map?: {
    version: number;
    file: string;
    sources: string[];
    names: string[];
    mappings: string;
  };
}

/*
    Ter voorkoming van onderstaande waarschuwing na `yarn start` hebben we zelf een fix geimplementeerd gebaseerd op
    https://github.com/fabriciomendonca/stencil-inline-svg/issues/16#issuecomment-2310081917.

    [core] [stencil] [ WARN  ]  Bundling Warning SOURCEMAP_BROKEN
    [core] [stencil]            [plugin inlineSvg] Sourcemap is likely to be incorrect: a plugin
    [core] [stencil]            (inlineSvg) was used to transform files, but didn't generate a
    [core] [stencil]            sourcemap for the transformation. Consult the plugin documentation
    [core] [stencil]            for help
 */
export function inlineSvg(): PluginTransformer {
  return {
    name: "inlineSvg",
    transform(sourceText: string, fileName: string): Promise<PluginTransformResultsWithMap> {
      if (!usePlugin(fileName)) {
        return Promise.resolve({} as PluginTransformResultsWithMap);
      }

      if (sourceText === "") {
        throw new Error("/** inlineSvg error: the SVG file is empty **/");
      }

      return new Promise<PluginTransformResultsWithMap>((resolve) => {
        const svgCode = decodeBase64SourceText(sourceText) || sourceText;

        const map = {
          version: 3,
          file: fileName,
          sources: [fileName],
          names: [],
          mappings: "",
        };

        resolve({
          id: fileName,
          code: `export default \`${svgCode}\`;`,
          map,
        });
      });
    },
  };
}

function usePlugin(fileName: string) {
  return /\.svg$/i.test(fileName);
}
