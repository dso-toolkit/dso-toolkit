# Dependencies update procedure

Dependency updates doen we bij voorkeur aan het begin van een sprint zodat we de nieuwe versies zelf kunnen ervaren. Dit sluit bevindingen van afnemers natuurlijk niet uit.

## Patches

Inventariseer voor welke packages er patches zijn gemaakt in `/patches`. Voor een update van een package met 'n patch betekent onderzoek naar de gevolgen.

Vanaf release 🪼 69.2.1 kennen we (weer) 2 patches:

### `@stencil+angular-output-target+0.7.1.patch`

In deze patch fixen wij een bug (omissie) in `@stencil/angular-output-target`, waarbij de events die web-componenten
kunnen emitten niet herkend worden door een IDE. Deze fix zorgt ervoor dat de door
`@stencil/angular-output-target` gegenereerde code de juiste typings bevat, zodat er wel
intellisense/code-completion is in de IDE.
Momenteel kunnen we `@stencil/angular-output-target` niet zonder meerwerk updaten. Pas wanneer het DSO-toolkit
github-issue [3049](https://github.com/dso-toolkit/dso-toolkit/issues/3049) in een reproduceerbare en in een
Angular-project verifieerbare oplossing heeft geresulteerd gaan we daar mee verder.

### `@whitespace+storybook-addon-html+5.1.6.patch`

🚧 Documentatie volgt 🚧

## TypeScript-versiebeleid

Bij het updaten van TypeScript houden we rekening met de versies die ondersteund worden door Stencil, Storybook en Angular:

- Stencil ondersteunt momenteel TypeScript tot en met versie 5.5.4 (Stencil v4.27.2).
- Storybook (v7) draait officieel op TypeScript 4.9, maar is compatibel met hogere versies.
- Angular (v19.02) ondersteunt TypeScript \>=5.5.0 \<5.9.0.

In github-issue [2987](https://github.com/dso-toolkit/dso-toolkit/pull/2987) is TypeScript geüpdatet van 5.6.3 naar 5.7.x. Hoewel dit geen build errors opleverde, veroorzaakte het wel IDE-errors omdat Stencil nog geen support biedt voor TypeScript 5.7. Om geen nieuwe issues te introduceren is besloten om terug te keren naar versie 5.6.3.

Stencil loopt traditioneel achter op de laatste TypeScript-releases. Houd bij toekomstige updates daarom altijd rekening met de maximale ondersteunde TypeScript-versie van Stencil. Voer een check uit op:

- Stencil TypeScript versie ondersteuning ([changelog](https://github.com/stenciljs/core/blob/main/CHANGELOG.md), [package.json](https://github.com/stenciljs/core/blob/main/package.json))
- Storybook TypeScript versie ondersteuning ([documentatie](https://storybook.js.org/docs/configure/integration/typescript#typescript-49-support) Storybook)
- Angular TypeScript versie ondersteuning ([documentatie](https://angular.dev/reference/versions#) Angular)

Pas de TypeScript-versie dus alleen aan als alle gebruikte tools deze ondersteunen, óf als de build én ontwikkelervaring (IDE) geen fouten opleveren.

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
