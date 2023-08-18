set -euo pipefail
IFS=$'\n\t'

echo $DT_DOCKER_PAT | docker login ghcr.io --username $DT_DOCKER_USERNAME --password-stdin

TAG=${TRAVIS_PULL_REQUEST_BRANCH/\#/}

# danger ci
docker run \
  --env CI \
  --env DANGER_GITHUB_API_TOKEN \
  --env TRAVIS_PULL_REQUEST \
  --env TRAVIS_REPO_SLUG \
  --env TRAVIS_JOB_ID \
  --env HAS_JOSH_K_SEAL_OF_APPROVAL \
  ghcr.io/dso-toolkit/dso-toolkit:${TAG}-source \
  "yarn danger-ci"
