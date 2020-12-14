const { copyFileSync, mkdirSync, rmdirSync } = require('fs');
const { dirname, resolve } = require('path');

rmdirSync(resolve(__dirname, '../src/components/icon/icon-assets'), { recursive: true });

mkdirSync(resolve(__dirname, '../src/components/icon/icon-assets'));

copyFileSync(
  resolve(dirname(require.resolve('@dso-toolkit/styling')), 'dist/dso-icons.svg'),
  resolve(__dirname, '../src/components/icon/icon-assets/dso-icons.svg')
);
