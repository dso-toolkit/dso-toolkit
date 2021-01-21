const path = require('path');
const ncp = require('ncp').ncp;
const rimraf = require('rimraf');

const core = require.resolve('@dso-toolkit/core');
const corePath = path.dirname(core);

const assetDirs = ['icon-assets'];

for (const assetDir of assetDirs) {
  const source = path.resolve(corePath, 'dso-toolkit', assetDir);
  const destination = path.resolve('public', assetDir);

  rimraf.sync(destination);

  ncp(source, destination, errors => {
    if (errors) {
      throw new Error(errors);
    }

    console.log(`Done copying ${source}`);
  });
}
