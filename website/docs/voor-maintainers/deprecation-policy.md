# Deprecation policy

semver.org stelt met betrekking tot de [deprecation policy](https://semver.org/#how-should-i-handle-deprecating-functionality) het volgende:

> Het afkeuren van bestaande functionaliteit is een normaal onderdeel van softwareontwikkeling en is vaak nodig om
> vooruitgang te boeken. Wanneer u een deel van uw openbare API deprecate, moet u twee dingen doen: (1) uw
> documentatie bijwerken om gebruikers op de hoogte te stellen van de wijziging, en (2) een nieuwe minor release
> uitbrengen met de deprecation. Voordat u de functionaliteit in een nieuwe major release volledig verwijdert, moet er
> ten minste één minor release zijn die de deprecation bevat, zodat gebruikers soepel kunnen overstappen naar de nieuwe
> API.

Wat betekent dit voor DSO Toolkit?

- We voegen in `CHANGELOG.md` een entry toe conform de [Change Management Notatie](https://github.com/dso-toolkit/dso-toolkit/pull/3243/change-management-notatie) voor het betreffende Deprecate issue.
- We voegen de suffix `(Deprecated)` toe aan de naam van het component:
  - Dit doen we in de property `title` van de Storybook metadata van het component voor de HTML/CSS implementatie, bijv. in `whitebox.css-stories.ts` en/of voor de Core implementatie, bijv. in `tooltip.core-stories.ts`. Etaleren we het component ook in de Angular en/of React Storybook, dan voegen we ook daar de suffix `(Deprecated)` toe.
  - Dit doen we op de website in de betrefende mdx-file van het component. Hierbij moet ook het attribuut `name` van het `StorybookComponent` toegevoegd of aangepast worden, bijv.: `name="whitebox-deprecated"`.
  - Pas ook in `storybook/cypress/fixtures/image-snapshot-components.json` de property `name` van het betreffende component aan.
  - Pas ook in de e2e-test de url van `cy.visit` aan, bijv. voor `Tooltip` in `storybook/cypress/e2e/tooltip.cy.ts`: `cy.visit("http://localhost:45000/iframe.html?id=core-tooltip-deprecated--as-child");`.
- In de lit-html template van het betreffende component in Storybook voegen we 2 HTML comments toe: aan het begin `<!-- START DEPRECATED: use [hier de verwijzing naar het alternatief] -->` en aan het eind `<!-- END DEPRECATED -->`.
- We maken een nieuw issue aan om de functionaliteit (het component) in de toekomst te verwijderen.
