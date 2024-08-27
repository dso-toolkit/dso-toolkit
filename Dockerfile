FROM cypress/included:cypress-13.13.3-node-20.17.0-chrome-127.0.6533.119-1-ff-129.0.1-edge-127.0.2651.98-1

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
  && apt-get install azure-cli=2.61.0-1~${AZ_DIST}

# https://gist.github.com/aessing/76f1200c9f5b2b9671937b3b0ed5fd6f?permalink_comment_id=4855321#gistcomment-4855321
RUN curl -L https://azcopyvnext.azureedge.net/releases/release-10.26.0-20240731/azcopy_linux_amd64_10.26.0.tar.gz | tar --strip-components=1 -C /usr/local/bin --no-same-owner --exclude=*.txt -xzvf -

WORKDIR /usr/src/app

COPY package.json yarn.lock .yarnrc.yml ./

COPY angular-workspace/package.json ./angular-workspace/package.json
COPY packages/core/package.json ./packages/core/package.json
COPY packages/dso-toolkit/package.json ./packages/dso-toolkit/package.json
COPY packages/react/package.json ./packages/react/package.json
COPY storybook/package.json ./storybook/package.json
COPY website/package.json ./website/package.json

COPY .yarn ./.yarn
COPY patches ./patches

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
