# Dependencies update procedure

Dependency updates doen we bij voorkeur aan het begin van een sprint zodat we de nieuwe versies zelf kunnen ervaren. Dit sluit bevindingen van afnemers natuurlijk niet uit.

Inventariseer voor welke packages er patches zijn gemaakt in `/patches`. Voor een update van een package met 'n patch betekent onderzoek naar de gevolgen.

## Yarn update

Installeer de nieuwste Yarn.

```sh
yarn set version berry
```

## Dependencies update

Niet elke dependency maakt gebruik van SemVer, in het bijzonder `sass`. Elke breaking release behoeft onderzoek. Kijk naar GitHub releases, CHANGELOG, blogposts, etc.

Angular en Storybook hebben een eigen update procedure. Prettier, Stylelint en ESLint updaten we in een eigen issue.

De dependencies `typescript` en `tslib` moeten voor alle packages onderling identiek zijn. Hetzelfde geldt voor de Angular en Storybook dependencies.

Let erop dat er aan het einde van de update procedure geen onverklaarbare `node_modules` directories in onze packages zijn ontstaan. Dit kan duiden op versie conflicten.

```sh
yarn upgrade-interactive
```

```sh
yarn dedupe --check # zonder --check als nodig
```

## Danger.yml

In `.github/workflows/danger.yml` de packages TypeScript en Danger meenemen.

## Node / Cypress

Let op de Docker base image in de Dockerfile.

## Azcopy

Controleer op https://github.com/Azure/azure-storage-azcopy/releases of er een nieuwe release is voor azcopy. Pas indien nodig in de Dockerfile de link naar de tar.gz-file aan met het versienummer (bijv. 10.26.0) en de datum van de release (bijv. 20240731). `https://azcopyvnext.azureedge.net/releases/release-<versienummer>-<releasedatum>/azcopy_linux_amd64_<versienummer>.tar.gz` en controleer dat de link de juiste file download.

## Storybook

In `/storybook`:

```sh
yarn dlx storybook@latest upgrade
```

In `/packages/react`:

```sh
yarn dlx storybook@latest upgrade
```

In `/angular-workspace`:

```sh
yarn dlx storybook@latest upgrade
```

Doorzoek alle `package.json` in de repository op de oude versie van Storybook, er zijn meer `@storybook/` packages die buiten een Storybook installatie worden gebruikt. Let erop dat alle Storybook packages exact dezelfde versie hebben.

Daarna weer dedupe:

```sh
yarn dedupe --check # zonder --check als nodig
```

## Angular

Zolang https://github.com/angular/angular-cli/issues/14841 niet is opgelost heeft de Angular CLI geen ondersteuning voor Yarn Workspaces. Het update proces gaat fout door de entries met `workspace:^` in `/angular-workspace/package.json`.

Het update proces is een handmatige handeling waarbij een beetje met `yarn workspace angular-workspace ng update @angular/cli @angular/core` wordt gedaan en versie nummers updaten (handmatig of met `yarn upgrade-interactive`).

Als er een major release zijn er mogelijk migrations zijn:

```sh
ng update @angular/cli --from 10 --to 11 --migrate-only
```

Zie ook https://update.angular.io/

## Sub dependencies update

```sh
yarn up * --recursive
```

En dedupe:

```sh
yarn dedupe --check # zonder --check als nodig
```

## Afronden

- Volledige lokale build: lint, build, build-www en e2e.
- Aanbieden als PR.
- Nieuw issue aanmaken voor volgende dependency update.
