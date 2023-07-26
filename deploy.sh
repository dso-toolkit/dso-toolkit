set -euo pipefail
IFS=$'\n\t'

eval "$(ssh-agent -s)"
echo $DT_PRIVATE_KEY_BASE64 | base64 --decode | ssh-add -
mkdir --parents ~/.ssh
cat known_hosts >> ~/.ssh/known_hosts
echo -e "Host ${DT_DEPLOY_HOST}\n\tCheckHostIP no\n" >> ~/.ssh/config

rsync --rsh "ssh -p ${DT_DEPLOY_PORT}" --delete --recursive ./storybook/www/ ${DT_DEPLOY_USER}@${DT_DEPLOY_HOST}:${DT_DEPLOY_ROOT}/storybook.dso-toolkit.nl/www/${TRAVIS_BRANCH/\#/_}
rsync --rsh "ssh -p ${DT_DEPLOY_PORT}" --delete --recursive ./packages/react/www/ ${DT_DEPLOY_USER}@${DT_DEPLOY_HOST}:${DT_DEPLOY_ROOT}/react.dso-toolkit.nl/www/${TRAVIS_BRANCH/\#/_}
rsync --rsh "ssh -p ${DT_DEPLOY_PORT}" --delete --recursive ./angular-workspace/www/ ${DT_DEPLOY_USER}@${DT_DEPLOY_HOST}:${DT_DEPLOY_ROOT}/angular.dso-toolkit.nl/www/${TRAVIS_BRANCH/\#/_}
rsync --rsh "ssh -p ${DT_DEPLOY_PORT}" --delete --recursive ./website/www/ ${DT_DEPLOY_USER}@${DT_DEPLOY_HOST}:${DT_DEPLOY_ROOT}/dso-toolkit.nl/www/${TRAVIS_BRANCH/\#/_}
rsync --rsh "ssh -p ${DT_DEPLOY_PORT}" --delete --recursive --exclude 'node_modules' ./packages/dso-toolkit/ ${DT_DEPLOY_USER}@${DT_DEPLOY_HOST}:${DT_DEPLOY_ROOT}/cdn.dso-toolkit.nl/www/dso-toolkit/${TRAVIS_BRANCH/\#/_}
rsync --rsh "ssh -p ${DT_DEPLOY_PORT}" --delete --recursive --exclude 'node_modules' ./packages/core/ ${DT_DEPLOY_USER}@${DT_DEPLOY_HOST}:${DT_DEPLOY_ROOT}/cdn.dso-toolkit.nl/www/@dso-toolkit/core/${TRAVIS_BRANCH/\#/_}

if [ -n "$TRAVIS_TAG" ]
then
  yarn config set npmAuthToken "${DT_DEPLOY_NPM_TOKEN}"
  npm config set //registry.npmjs.org/:_authToken ${DT_DEPLOY_NPM_TOKEN}

  yarn workspace @dso-toolkit/core version ${TRAVIS_TAG:1} --immediate
  yarn workspace @dso-toolkit/react version ${TRAVIS_TAG:1} --immediate
  yarn workspace dso-toolkit version ${TRAVIS_TAG:1} --immediate

  yarn workspace dso-toolkit npm publish --access public
  yarn workspace @dso-toolkit/core npm publish --access public
  yarn workspace @dso-toolkit/react npm publish --access public

  cd angular-workspace/dist/component-library
  npm version ${TRAVIS_TAG:1}
  npm publish
  cd ../../..

  rsync --rsh "ssh -p ${DT_DEPLOY_PORT}" --delete --recursive ./storybook/www/ ${DT_DEPLOY_USER}@${DT_DEPLOY_HOST}:${DT_DEPLOY_ROOT}/storybook.dso-toolkit.nl/www/${TRAVIS_TAG:1}
  rsync --rsh "ssh -p ${DT_DEPLOY_PORT}" --delete --recursive ./packages/react/www/ ${DT_DEPLOY_USER}@${DT_DEPLOY_HOST}:${DT_DEPLOY_ROOT}/react.dso-toolkit.nl/www/${TRAVIS_TAG:1}
  rsync --rsh "ssh -p ${DT_DEPLOY_PORT}" --delete --recursive ./angular-workspace/www/ ${DT_DEPLOY_USER}@${DT_DEPLOY_HOST}:${DT_DEPLOY_ROOT}/angular.dso-toolkit.nl/www/${TRAVIS_TAG:1}
  rsync --rsh "ssh -p ${DT_DEPLOY_PORT}" --delete --recursive ./website/www/ ${DT_DEPLOY_USER}@${DT_DEPLOY_HOST}:${DT_DEPLOY_ROOT}/dso-toolkit.nl/www/${TRAVIS_TAG:1}
  rsync --rsh "ssh -p ${DT_DEPLOY_PORT}" --delete --recursive --exclude 'node_modules' ./packages/dso-toolkit/ ${DT_DEPLOY_USER}@${DT_DEPLOY_HOST}:${DT_DEPLOY_ROOT}/cdn.dso-toolkit.nl/www/dso-toolkit/${TRAVIS_TAG:1}
  rsync --rsh "ssh -p ${DT_DEPLOY_PORT}" --delete --recursive --exclude 'node_modules' ./packages/core/ ${DT_DEPLOY_USER}@${DT_DEPLOY_HOST}:${DT_DEPLOY_ROOT}/cdn.dso-toolkit.nl/www/@dso-toolkit/core/${TRAVIS_TAG:1}
fi

ssh -p ${DT_DEPLOY_PORT} ${DT_DEPLOY_USER}@${DT_DEPLOY_HOST} "cd ${DT_DEPLOY_ROOT}/webhooks.dso-toolkit.nl && powershell -Command \"npm run update-versions\""
