FROM cypress/included:cypress-15.7.1-node-24.12.0-chrome-143.0.7499.40-1-ff-146.0-edge-143.0.3650.66-1

RUN apt-get update && apt-get install --yes \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg2 \
  jq \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libgtk-3-0 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxi6 \
  libxrandr2 \
  libxss1 \
  libxtst6 \
  lsb-release

ARG AZ_CLI_VERSION=2.81.0-1~bookworm

RUN set -eux; \
    mkdir -p /etc/apt/keyrings; \
    curl -sLS https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /etc/apt/keyrings/microsoft.gpg; \
    chmod 644 /etc/apt/keyrings/microsoft.gpg; \
    printf '%s\n' \
      'Types: deb' \
      'URIs: https://packages.microsoft.com/repos/azure-cli/' \
      'Suites: bookworm' \
      'Components: main' \
      "Architectures: $(dpkg --print-architecture)" \
      'Signed-by: /etc/apt/keyrings/microsoft.gpg' \
      > /etc/apt/sources.list.d/azure-cli.sources; \
    apt-get update; \
    apt-get install -y --no-install-recommends azure-cli=${AZ_CLI_VERSION}; \
    rm -rf /var/lib/apt/lists/*;

# AzCopy install
RUN curl -L https://github.com/Azure/azure-storage-azcopy/releases/download/v10.31.0/azcopy_linux_amd64_10.31.0.tar.gz \
  | tar --strip-components=1 -C /usr/local/bin --no-same-owner --exclude=*.txt -xzvf -

WORKDIR /usr/src/app

COPY package.json yarn.lock .yarnrc.yml ./

COPY angular-workspace/package.json ./angular-workspace/package.json
COPY packages/core/package.json ./packages/core/package.json
COPY packages/dso-toolkit/package.json ./packages/dso-toolkit/package.json
COPY packages/react/package.json ./packages/react/package.json
COPY storybook/package.json ./storybook/package.json
COPY website/package.json ./website/package.json

COPY .yarn ./.yarn

ARG CI

RUN yarn install --immutable

COPY . .

RUN yarn dedupe --check
RUN (yarn npm audit --all --recursive || true)
RUN yarn lint

ARG DT_REF

RUN yarn build

RUN yarn build-www

ENTRYPOINT ["/bin/bash", "-c"]