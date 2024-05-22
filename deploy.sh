set -euo pipefail
IFS=$'\n\t'

AZURE_STORAGE_ACCOUNT_NAME=$DT_AZURE_STORAGE_ACCOUNT_NAME_ACC
AZURE_STORAGE_ACCOUNT_KEY=$DT_AZURE_STORAGE_ACCOUNT_KEY_ACC
AZURE_STORAGE_URL=$DT_AZURE_STORAGE_URL_ACC
AZURE_STORAGE_CONTAINER=$DT_AZURE_STORAGE_CONTAINER_ACC

SAS_TOKEN=$(az storage container generate-sas --name "${AZURE_STORAGE_CONTAINER}" --permissions acdlrw --expiry $(date -u -v +1H +"%Y-%m-%dT%H:%M:%SZ") --account-name "$AZURE_ACCOUNT_NAME" --account-key "$AZURE_ACCOUNT_KEY" | jq -r)

azcopy sync --dry-run --from-to LocalBlob ./storybook/www/ "https://${AZURE_STORAGE_URL}/${AZURE_STORAGE_CONTAINER}/storybook.dso-toolkit.nl/www/${DT_REF}/?${SAS_TOKEN}"
azcopy sync --dry-run --from-to LocalBlob ./packages/react/www/ "https://${AZURE_STORAGE_URL}/${AZURE_STORAGE_CONTAINER}/react.dso-toolkit.nl/www/${DT_REF}/?${SAS_TOKEN}"
azcopy sync --dry-run --from-to LocalBlob ./angular-workspace/www/ "https://${AZURE_STORAGE_URL}/${AZURE_STORAGE_CONTAINER}/angular.dso-toolkit.nl/www/${DT_REF}/?${SAS_TOKEN}"
azcopy sync --dry-run --from-to LocalBlob ./website/www/ "https://${AZURE_STORAGE_URL}/${AZURE_STORAGE_CONTAINER}/dso-toolkit.nl/www/${DT_REF}/?${SAS_TOKEN}"
azcopy sync --dry-run --from-to LocalBlob ./packages/dso-toolkit/ "https://${AZURE_STORAGE_URL}/${AZURE_STORAGE_CONTAINER}/cdn.dso-toolkit.nl/www/dso-toolkit/${DT_REF}/?${SAS_TOKEN}"
azcopy sync --dry-run --from-to LocalBlob ./packages/core/ "https://${AZURE_STORAGE_URL}/${AZURE_STORAGE_CONTAINER}/cdn.dso-toolkit.nl/www/@dso-toolkit/core/${DT_REF}/?${SAS_TOKEN}"

if [[ -n ${DT_DIST_TAG+x} && $DT_DIST_TAG == "latest" ]]
then
  yarn config set npmAuthToken "${DT_DEPLOY_NPM_TOKEN}"
  npm config set //registry.npmjs.org/:_authToken ${DT_DEPLOY_NPM_TOKEN}

  yarn workspace @dso-toolkit/core version ${DT_REF} --immediate
  yarn workspace @dso-toolkit/react version ${DT_REF} --immediate
  yarn workspace dso-toolkit version ${DT_REF} --immediate

  yarn workspace dso-toolkit npm publish --access public
  yarn workspace @dso-toolkit/core npm publish --access public
  yarn workspace @dso-toolkit/react npm publish --access public

  cd angular-workspace/dist/component-library
  npm version ${DT_REF}
  npm publish
  cd ../../..

  # gh release create v${DT_REF} --generate-notes --verify-tag
fi

yarn tsx ./scripts/list-versions-azure-blob-storage.ts > versions.json
cat versions.json
azcopy copy --dry-run --overwrite --from-to LocalBlob ./versions.json "https://${AZURE_STORAGE_URL}/${AZURE_STORAGE_CONTAINER}/dso-toolkit.nl/www/versions.json/?${SAS_TOKEN}"

# Todo: Prune old versions
