import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
// import { reactOutputTarget } from '@stencil/react-output-target';

import { dsoIcon } from './src/icon/dso-icon-sass-function';

export const config: Config = {
  namespace: 'dso-toolkit',
  globalStyle: 'src/global-styling.scss',
  plugins: [
    sass({
      functions: {
        ...dsoIcon
      }
    })
  ],
  outputTargets: [
    // reactOutputTarget({
    //   componentCorePackage: '@dso-toolkit/core',
    //   proxiesFile: '../react/src/components.ts'
    // }),
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
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    {
      type: 'dist-hydrate-script',
      dir: '../dso-toolkit/hydrate'
    }
  ],
};
