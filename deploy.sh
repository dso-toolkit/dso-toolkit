set -euo pipefail
IFS=$'\n\t'

if [[ -n ${DT_AZURE_STORAGE_HOST+x} && -n ${DT_AZURE_STORAGE_CONTAINER+x} && -n ${DT_AZURE_STORAGE_ACCOUNT_NAME+x} && -n ${DT_AZURE_STORAGE_ACCOUNT_KEY+x} && -n ${DT_REF+x} && -n ${GH_TOKEN+x} ]]
then
  SAS_TOKEN=$(az storage container generate-sas --name "$DT_AZURE_STORAGE_CONTAINER" --permissions acdlrw --expiry $(date --utc --date '+1 hour' +"%Y-%m-%dT%H:%M:%SZ") --account-name "$DT_AZURE_STORAGE_ACCOUNT_NAME" --account-key "$DT_AZURE_STORAGE_ACCOUNT_KEY" | jq -r)

  # https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#masking-a-value-in-a-log
  echo "::add-mask::$SAS_TOKEN"

  yarn workspace dso-toolkit pack --dry-run --json | yarn tsx scripts/create-hashes
  yarn workspace @dso-toolkit/core pack --dry-run --json | yarn tsx scripts/create-hashes

  azcopy sync --from-to=LocalBlob --delete-destination=true ./storybook/www/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/storybook.dso-toolkit.nl/www/${DT_REF}/?${SAS_TOKEN}"
  azcopy sync --from-to=LocalBlob --delete-destination=true ./packages/react/www/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/react.dso-toolkit.nl/www/${DT_REF}/?${SAS_TOKEN}"
  azcopy sync --from-to=LocalBlob --delete-destination=true ./angular-workspace/www/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/angular.dso-toolkit.nl/www/${DT_REF}/?${SAS_TOKEN}"
  azcopy sync --from-to=LocalBlob --delete-destination=true ./website/www/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/dso-toolkit.nl/www/${DT_REF}/?${SAS_TOKEN}"
  azcopy sync --from-to=LocalBlob --delete-destination=true ./packages/dso-toolkit/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/cdn.dso-toolkit.nl/www/dso-toolkit/${DT_REF}/?${SAS_TOKEN}"
  azcopy sync --from-to=LocalBlob --delete-destination=true ./packages/core/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/cdn.dso-toolkit.nl/www/@dso-toolkit/core/${DT_REF}/?${SAS_TOKEN}"

  yarn tsx ./scripts/update-azure-blob-storage/main --azureStorageHost "$DT_AZURE_STORAGE_HOST" --azureStorageContainer "$DT_AZURE_STORAGE_CONTAINER" --azureSasToken "$SAS_TOKEN" --githubToken "$GH_TOKEN"

else
  echo "Skipping deploy to dso-toolkit.nl due to missing environment variables."
fi

if [[ -n ${DT_DIST_TAG+x} && -n ${DT_DEPLOY_NPM_TOKEN+x} ]]
then
  yarn config set npmAuthToken "${DT_DEPLOY_NPM_TOKEN}"
  npm config set //registry.npmjs.org/:_authToken ${DT_DEPLOY_NPM_TOKEN}

  yarn workspace dso-toolkit npm publish --access public --tag ${DT_DIST_TAG}
  yarn workspace @dso-toolkit/core npm publish --access public --tag ${DT_DIST_TAG}
  yarn workspace @dso-toolkit/react npm publish --access public --tag ${DT_DIST_TAG}

  cd angular-workspace/dist/component-library
  npm publish --access public --tag ${DT_DIST_TAG}
  cd ../../..
else
  echo "Skipping npm publish due to missing DT_DIST_TAG."
fi
