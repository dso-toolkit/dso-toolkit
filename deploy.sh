set -euo pipefail
IFS=$'\n\t'

SAS_TOKEN=$(az storage container generate-sas --name "$DT_AZURE_STORAGE_CONTAINER" --permissions acdlrw --expiry $(date --utc --date '+1 hour' +"%Y-%m-%dT%H:%M:%SZ") --account-name "$DT_AZURE_STORAGE_ACCOUNT_NAME" --account-key "$DT_AZURE_STORAGE_ACCOUNT_KEY" | jq -r)

# https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#masking-a-value-in-a-log
echo "::add-mask::$SAS_TOKEN"

yarn workspace dso-toolkit pack --dry-run --json | yarn tsx scripts/create-hashes > packages/dso-toolkit/hashes.json
yarn workspace @dso-toolkit/core pack --dry-run --json | yarn tsx scripts/create-hashes > packages/core/hashes.json

azcopy sync --from-to=LocalBlob --delete-destination=true ./storybook/www/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/storybook.dso-toolkit.nl/www/${DT_REF}/?${SAS_TOKEN}"
azcopy sync --from-to=LocalBlob --delete-destination=true ./packages/react/www/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/react.dso-toolkit.nl/www/${DT_REF}/?${SAS_TOKEN}"
azcopy sync --from-to=LocalBlob --delete-destination=true ./angular-workspace/www/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/angular.dso-toolkit.nl/www/${DT_REF}/?${SAS_TOKEN}"
azcopy sync --from-to=LocalBlob --delete-destination=true ./website/www/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/dso-toolkit.nl/www/${DT_REF}/?${SAS_TOKEN}"
azcopy sync --from-to=LocalBlob --delete-destination=true ./packages/dso-toolkit/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/cdn.dso-toolkit.nl/www/dso-toolkit/${DT_REF}/?${SAS_TOKEN}"
azcopy sync --from-to=LocalBlob --delete-destination=true ./packages/core/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/cdn.dso-toolkit.nl/www/@dso-toolkit/core/${DT_REF}/?${SAS_TOKEN}"

if [[ -n ${DT_DIST_TAG+x} && $DT_DIST_TAG == "latest" ]]
then
  yarn config set npmAuthToken "${DT_DEPLOY_NPM_TOKEN}"
  npm config set //registry.npmjs.org/:_authToken ${DT_DEPLOY_NPM_TOKEN}

  yarn workspace dso-toolkit npm publish --access public
  yarn workspace @dso-toolkit/core npm publish --access public
  yarn workspace @dso-toolkit/react npm publish --access public

  cd angular-workspace/dist/component-library
  npm publish
  cd ../../..
fi

yarn tsx ./scripts/update-azure-blob-storage/main --azureStorageHost "$DT_AZURE_STORAGE_HOST" --azureStorageContainer "$DT_AZURE_STORAGE_CONTAINER" --azureSasToken "$SAS_TOKEN" --githubToken "$GH_TOKEN"
