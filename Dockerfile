FROM cypress/included:cypress-13.17.0-node-22.13.0-chrome-131.0.6778.264-1-ff-134.0-edge-131.0.2903.112-1

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

# https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-linux?pivots=apt#option-2-step-by-step-installation-instructions
RUN mkdir -p /etc/apt/keyrings \
  && curl -sLS https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /etc/apt/keyrings/microsoft.gpg \
  && chmod go+r /etc/apt/keyrings/microsoft.gpg \
  && AZ_DIST=$(lsb_release -cs) \
  && echo "Types: deb\nURIs: https://packages.microsoft.com/repos/azure-cli/\nSuites: ${AZ_DIST}\nComponents: main\nArchitectures: $(dpkg --print-architecture)\nSigned-by: /etc/apt/keyrings/microsoft.gpg" | tee /etc/apt/sources.list.d/azure-cli.sources \
  && apt-get update \
  && apt-get install azure-cli=2.71.0-1~${AZ_DIST}

# https://github.com/Azure/azure-cli/issues/30635#issuecomment-2581362583
RUN curl -L https://azcopyvnext-awgzd8g7aagqhzhe.b02.azurefd.net/releases/release-10.28.0-20250127/azcopy_linux_amd64_10.28.0.tar.gz | tar --strip-components=1 -C /usr/local/bin --no-same-owner --exclude=*.txt -xzvf -

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
