set -euo pipefail
IFS=$'\n\t'

mkdir --verbose --parents ~/.docker/cli-plugins/
curl --silent --location "https://github.com/docker/buildx/releases/download/v0.11.2/buildx-v0.11.2.linux-amd64" > ~/.docker/cli-plugins/docker-buildx
chmod a+x ~/.docker/cli-plugins/docker-buildx
docker buildx install

echo $DT_DOCKER_PAT | docker login ghcr.io --username $DT_DOCKER_USERNAME --password-stdin

BRANCH=${TRAVIS_PULL_REQUEST_BRANCH:-$TRAVIS_BRANCH}
TAG=${BRANCH/\#/}

echo "Docker tag: $TAG"

# create build environment
docker build \
  --target source \
  --cache-to type=inline \
  --cache-from ghcr.io/dso-toolkit/dso-toolkit:${TAG}-source \
  --cache-from ghcr.io/dso-toolkit/dso-toolkit:master-source \
  --tag ghcr.io/dso-toolkit/dso-toolkit:${TAG}-source \
  --progress plain \
  --build-arg CI \
  --build-arg TRAVIS_BRANCH \
  --build-arg TRAVIS_TAG \
  --pull \
  .

docker push ghcr.io/dso-toolkit/dso-toolkit:${TAG}-source
