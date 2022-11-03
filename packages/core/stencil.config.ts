import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
  namespace: 'dso-toolkit',
  devServer: {
    port: 53333
  },
  plugins: [
    inlineSvg(),
    sass({
      includePaths: ['../../node_modules']
    })
  ],
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '@dso-toolkit/core',
      proxiesFile: '../react/src/components.ts'
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    }
  ],
};
