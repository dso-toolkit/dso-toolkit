set -euo pipefail
IFS=$'\n\t'

mkdir --verbose --parents ~/.docker/cli-plugins/
curl --silent --location "https://github.com/docker/buildx/releases/download/v0.11.2/buildx-v0.11.2.linux-amd64" > ~/.docker/cli-plugins/docker-buildx
chmod a+x ~/.docker/cli-plugins/docker-buildx
docker buildx install

echo $DT_DOCKER_PAT | docker login ghcr.io --username $DT_DOCKER_USERNAME --password-stdin

TAG=${TRAVIS_BRANCH/\#/}

# create build-env
docker build \
  --target build \
  --cache-to type=inline \
  --cache-from ghcr.io/dso-toolkit/dso-toolkit:master-build \
  --cache-from ghcr.io/dso-toolkit/dso-toolkit:${TAG}-build \
  --tag ghcr.io/dso-toolkit/dso-toolkit:${TAG}-build \
  --progress plain \
  --build-arg CI \
  --pull \
  .

docker push ghcr.io/dso-toolkit/dso-toolkit:${TAG}-build
