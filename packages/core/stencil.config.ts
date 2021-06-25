import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';
import { inlineSvg } from 'stencil-inline-svg';

import { dsoIcon } from './src/icon/dso-icon-sass-function';

export const config: Config = {
  namespace: 'dso-toolkit',
  devServer: {
    port: 53333
  },
  globalStyle: 'src/global-styling.scss',
  plugins: [
    inlineSvg(),
    sass({
      functions: {
        ...dsoIcon
      }
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
    },
    {
      type: 'dist-hydrate-script',
      dir: '../dso-toolkit/hydrate'
    }
  ],
};
