set -euo pipefail
IFS=$'\n\t'

SAS_TOKEN=$(az storage container generate-sas --name "$DT_AZURE_STORAGE_CONTAINER" --permissions acdlrw --expiry $(date --utc --date '+1 hour' +"%Y-%m-%dT%H:%M:%SZ") --account-name "$DT_AZURE_STORAGE_ACCOUNT_NAME" --account-key "$DT_AZURE_STORAGE_ACCOUNT_KEY" | jq -r)

# https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#masking-a-value-in-a-log
echo "::add-mask::$SAS_TOKEN"

pnpm exec tsx scripts/create-hashes dso-toolkit
pnpm exec tsx scripts/create-hashes @dso-toolkit/core

azcopy sync --from-to=LocalBlob --delete-destination=true ./storybook/www/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/storybook.dso-toolkit.nl/www/${DT_REF}/?${SAS_TOKEN}"
azcopy sync --from-to=LocalBlob --delete-destination=true ./packages/react/www/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/react.dso-toolkit.nl/www/${DT_REF}/?${SAS_TOKEN}"
azcopy sync --from-to=LocalBlob --delete-destination=true ./angular-workspace/www/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/angular.dso-toolkit.nl/www/${DT_REF}/?${SAS_TOKEN}"
azcopy sync --from-to=LocalBlob --delete-destination=true ./website/www/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/dso-toolkit.nl/www/${DT_REF}/?${SAS_TOKEN}"
azcopy sync --from-to=LocalBlob --delete-destination=true ./packages/dso-toolkit/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/cdn.dso-toolkit.nl/www/dso-toolkit/${DT_REF}/?${SAS_TOKEN}"
azcopy sync --from-to=LocalBlob --delete-destination=true ./packages/core/ "https://${DT_AZURE_STORAGE_HOST}/${DT_AZURE_STORAGE_CONTAINER}/cdn.dso-toolkit.nl/www/@dso-toolkit/core/${DT_REF}/?${SAS_TOKEN}"

if [[ -n ${DT_DIST_TAG+x} && $DT_DIST_TAG == "latest" ]]
then
  pnpm config set //registry.npmjs.org/:_authToken "${DT_DEPLOY_NPM_TOKEN}"

  pnpm --filter dso-toolkit publish --access public --no-git-checks
  pnpm --filter @dso-toolkit/core publish --access public --no-git-checks
  pnpm --filter @dso-toolkit/react publish --access public --no-git-checks

  # @dso-toolkit/angular must be built first by ng-packagr before it can be published.
  # Unlike the other packages, the source cannot be published directly — only the compiled dist/ can.
  # Because dist/ doesn't exist until after the build, it can't be added to pnpm-workspace.yaml
  # (pnpm reads that file during install, before any build has run).
  # So that's why we publish directly from the compiled dist/ folder here.
  # The build itself happens in the Dockerfile via `pnpm build` (nx run-many --target=build).
  pnpm publish angular-workspace/dist/component-library --no-git-checks
fi

pnpm exec tsx ./scripts/update-azure-blob-storage/main --azureStorageAccountName "$DT_AZURE_STORAGE_ACCOUNT_NAME" --azureStorageAccountKey "$DT_AZURE_STORAGE_ACCOUNT_KEY" --azureStorageHostDfs "$DT_AZURE_STORAGE_HOST_DFS" --azureStorageContainer "$DT_AZURE_STORAGE_CONTAINER"  --githubToken "$GH_TOKEN"
