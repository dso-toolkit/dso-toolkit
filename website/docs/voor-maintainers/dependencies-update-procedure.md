# Dependencies update procedure

Dependency updates doen we bij voorkeur aan het begin van een sprint zodat we de nieuwe versies zelf kunnen ervaren. Dit sluit bevindingen van afnemers natuurlijk niet uit.

## TypeScript-versiebeleid

De TypeScript-versie wordt bepaald door de traagste consument in de monorepo. We koppelen de versie aan de strengste bovengrens van alle gebruikte tools.

Huidige situatie (Stencil v4.43.5, Storybook v10.4.2, Angular v22):

- Stencil ondersteunt momenteel TypeScript tot en met versie 5.9.x (Stencil v4.43.5 draait goed op 5.9.3, officieel max 5.8.3).
- Storybook (v10) draait officieel op TypeScript 4.9, maar is compatibel met hogere versies.
- Angular (v22) ondersteunt TypeScript \>=5.9.0 \<6.0.0. Dit is de bepalende bovengrens: Angular's toolchain (`ng-packagr`, `@ngtools/webpack`) stelt een harde `<6.0` eis.

De TypeScript-versie staat daarom op `~5.9.3` voor alle packages in de monorepo. Upgrade naar TypeScript 6.x pas als Angular die bovengrens ophoogt. Voer een check uit op:

- Stencil TypeScript versie ondersteuning ([changelog](https://github.com/stenciljs/core/blob/main/CHANGELOG.md), [package.json](https://github.com/stenciljs/core/blob/main/package.json))
- Storybook TypeScript versie ondersteuning ([documentatie](https://storybook.js.org/docs/configure/integration/typescript#typescript-49-support) Storybook)
- Angular TypeScript versie ondersteuning ([documentatie](https://angular.dev/reference/versions#) Angular)

Pas de TypeScript-versie dus alleen aan als alle gebruikte tools deze ondersteunen, óf als de build én ontwikkelervaring (IDE) geen fouten opleveren.

## pnpm update

Installeer de nieuwste pnpm.

```sh
corepack use pnpm@latest
```

Hiermee wordt het "packageManager"-veld van de root package.json geüpdatet (versienummer + sha512 hash). Dat
instrueert Corepack om voor ons project altijd deze specifieke versie te gebruiken. Hiermee realiseren we
reproduceerbaarheid, aangezien alle ontwikkelaars dezelfde versie van Corepack gebruiken.

De `Dockerfile` gebruikt corepack, die de versie automatisch uit dit veld leest, dus die hoeft niet apart aangepast te worden.

## Dependencies update

Niet elke dependency maakt gebruik van SemVer, in het bijzonder `sass`. Elke breaking release behoeft onderzoek. Kijk naar GitHub releases, CHANGELOG, blogposts, etc.

Angular en Storybook hebben een eigen update procedure.

De dependencies `typescript` en `tslib` moeten voor alle packages onderling identiek zijn. Hetzelfde geldt voor de Angular en Storybook dependencies.

```sh
pnpm update --interactive --recursive --latest
```

```sh
pnpm dedupe --check # zonder --check als nodig
```

## Sass

Sass hanteert geen SemVer. Aan de versienummers is niet te zien of een release breaking is. In het verleden hebben Sass-updates de CSS output onverwacht anders gemaakt (denk aan quotes, paden), wat pas bij afnemers aan het licht kwam.

Vergelijk daarom altijd de gegenereerde `dso.css` van master met die van de topic branch en controleer of de verschillen kloppen.

## Danger.yml

In `.github/workflows/danger.yml` de packages TypeScript en Danger meenemen.

## Node / Cypress

Let op de Docker base image in de Dockerfile.

**Compatibiliteit Azure CLI**

Azure CLI ondersteunt momenteel alleen Debian 11 (Bullseye) en Debian 12 (Bookworm). Debian 13 (Trixie) wordt nog niet ondersteund (We gebruiken Bookworm in plaats van Trixie).

**Notitie:**

Bij elke nieuwe major versie van Node moet ook de README.md worden aangepast zodat de juiste Node-versie wordt gecommuniceerd naar gebruikers en ontwikkelaars.

## Azcopy

Controleer op https://github.com/Azure/azure-storage-azcopy/releases of er een nieuwe release is voor azcopy. Pas indien nodig in de Dockerfile de link naar de tar.gz-file aan met het versienummer (bijv. 10.26.0) en de datum van de release (bijv. 20240731). `https://azcopyvnext.azureedge.net/releases/release-<versienummer>-<releasedatum>/azcopy_linux_amd64_<versienummer>.tar.gz` en controleer dat de link de juiste file download.

## Storybook

In `/storybook`:

```sh
pnpm dlx storybook@latest upgrade
```

In `/packages/react`:

```sh
pnpm dlx storybook@latest upgrade
```

In `/angular-workspace`:

```sh
pnpm dlx storybook@latest upgrade
```

Doorzoek alle `package.json` in de repository op de oude versie van Storybook, er zijn meer `@storybook/` packages die buiten een Storybook installatie worden gebruikt. Let erop dat alle Storybook packages exact dezelfde versie hebben.

Daarna weer dedupe:

```sh
pnpm dedupe --check # zonder --check als nodig
```

## Angular

Het update proces is een handmatige handeling waarbij een beetje met `pnpm --filter angular-workspace ng update @angular/cli @angular/core` wordt gedaan en versie nummers updaten (handmatig of met `pnpm update --interactive --recursive`).

Als er een major release zijn er mogelijk migrations zijn:

```sh
ng update @angular/cli --from 10 --to 11 --migrate-only
```

Zie ook https://update.angular.io/

### Vervallen van een Angular-versie

Als de peer dependency range in `angular-workspace/projects/component-library/package.json` wordt aangepast zodat een Angular-versie wegvalt, is dit een **breaking change**.

- Voeg twee regels toe aan de blogpost van de bijbehorende release:
  - _"Daarnaast is in deze release de ondersteuning voor Angular X komen te vervallen."_
  - _"Vanaf deze release ondersteunt DSO Toolkit Angular versies X, Y en Z."_

## Sub dependencies update

```sh
pnpm update --recursive
```

En dedupe:

```sh
pnpm dedupe --check # zonder --check als nodig
```

## Afronden

- Volledige lokale build: lint, build, build-www en e2e.
- Aanbieden als PR.
- Nieuw issue aanmaken voor volgende dependency update.
- Security: Nadat de PR van een Packages: Dependencies updates is gemerged in master zal (na enige tijd) het aantal Dependabot alerts / vulnerabilities onder de tab Security and quality verminderd zijn. Idealiter 0, maar in de praktijk zullen er waarschijnlijk nog een aantal blijven bestaan. Deze moeten dan alsnog onderzocht en idealiter met onderbouwde reden gedismissed worden.
