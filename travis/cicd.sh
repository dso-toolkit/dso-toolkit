set -euo pipefail
IFS=$'\n\t'

mkdir --verbose --parents ~/.docker/cli-plugins/
curl --silent --location "https://github.com/docker/buildx/releases/download/v0.11.2/buildx-v0.11.2.linux-amd64" > ~/.docker/cli-plugins/docker-buildx
chmod a+x ~/.docker/cli-plugins/docker-buildx
docker buildx install

echo $DT_DOCKER_PAT | docker login ghcr.io --username $DT_DOCKER_USERNAME --password-stdin

TAG=${TRAVIS_BRANCH/\#/}

# dedupe check, npm audit, lint, build, build-www
docker build \
  --cache-to type=inline \
  --cache-from ghcr.io/dso-toolkit/dso-toolkit:master \
  --cache-from ghcr.io/dso-toolkit/dso-toolkit:${TAG} \
  --cache-from ghcr.io/dso-toolkit/dso-toolkit:${TAG}-source \
  --tag ghcr.io/dso-toolkit/dso-toolkit:${TAG} \
  --progress plain \
  --build-arg CI \
  --build-arg TRAVIS_BRANCH \
  --build-arg TRAVIS_TAG \
  --pull \
  .

docker push ghcr.io/dso-toolkit/dso-toolkit:${TAG} &

# e2e
docker run \
  --env CI \
  --env PERCY_TOKEN \
  --env TRAVIS_BRANCH \
  --env TRAVIS_BUILD_ID \
  --env TRAVIS_BUILD_NUMBER \
  --env TRAVIS_COMMIT \
  --env TRAVIS_PULL_REQUEST \
  --env TRAVIS_PULL_REQUEST_BRANCH \
  --volume /home/travis/build/dso-toolkit/dso-toolkit/storybook/cypress-parallel:/usr/src/app/storybook/cypress-parallel \
  ghcr.io/dso-toolkit/dso-toolkit:${TAG} \
  "yarn e2e"

# deploy
docker run \
  --env CI \
  --env DT_PRIVATE_KEY_BASE64 \
  --env DT_DEPLOY_HOST \
  --env DT_DEPLOY_PORT \
  --env DT_DEPLOY_USER \
  --env DT_DEPLOY_ROOT \
  --env DT_DEPLOY_NPM_TOKEN \
  --env DT_DEPLOY_GITHUB_TOKEN \
  --env TRAVIS_BRANCH \
  --env TRAVIS_TAG \
  ghcr.io/dso-toolkit/dso-toolkit:${TAG} \
  "bash deploy.sh"

wait
