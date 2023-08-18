FROM cypress/included:cypress-12.12.0-node-18.16.0-chrome-113.0.5672.92-1-ff-113.0-edge-113.0.1774.35-1 AS source

RUN apt-get update && apt-get install --yes \
  libx11-xcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxi6 \
  libxtst6 \
  libnss3 \
  libcups2 \
  libxss1 \
  libxrandr2 \
  libasound2 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  rsync=3.2.3-4+deb11u1

WORKDIR /usr/src/app

COPY package.json yarn.lock .yarnrc.yml ./

COPY angular-workspace/package.json ./angular-workspace/package.json
COPY packages/core/package.json ./packages/core/package.json
COPY packages/dso-toolkit/package.json ./packages/dso-toolkit/package.json
COPY packages/leaflet/package.json ./packages/leaflet/package.json
COPY packages/react/package.json ./packages/react/package.json
COPY packages/react-leaflet/package.json ./packages/react-leaflet/package.json
COPY storybook/package.json ./storybook/package.json
COPY website/package.json ./website/package.json

COPY .yarn ./.yarn
COPY patches ./patches

ARG CI

RUN yarn install --immutable

COPY . .

ENTRYPOINT ["/bin/bash", "-c"]

FROM source as build

RUN yarn dedupe --check
RUN (yarn npm audit --all --recursive || true)
RUN yarn lint

RUN yarn build

ARG CI
ARG TRAVIS_BRANCH
ARG TRAVIS_TAG

RUN yarn build-www
