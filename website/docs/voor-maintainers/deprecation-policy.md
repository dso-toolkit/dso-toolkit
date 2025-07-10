# Deprecation policy

semver.org stelt met betrekking tot de [deprecation policy](https://semver.org/#how-should-i-handle-deprecating-functionality) het volgende:

> Het afkeuren van bestaande functionaliteit is een normaal onderdeel van softwareontwikkeling en is vaak nodig om
> vooruitgang te boeken. Wanneer u een deel van uw openbare API deprecate, moet u twee dingen doen: (1) uw
> documentatie bijwerken om gebruikers op de hoogte te stellen van de wijziging, en (2) een nieuwe minor release
> uitbrengen met de deprecation. Voordat u de functionaliteit in een nieuwe major release volledig verwijdert, moet er
> ten minste één minor release zijn die de deprecation bevat, zodat gebruikers soepel kunnen overstappen naar de nieuwe
> API.

Wat betekent dit voor DSO Toolkit?

1.  We voegen in de CHANGELOG.md een entry toe conform [Change Management Notatie](./change-management-notatie) voor het onderhanden Deprecate issue.
2.  We suffixen de naam van het component met `(Deprecated)`:
    - Dit doen we in het title-attribuut van de storybook metadata van het component voor de HTML/CSS implemenatie,
      bijv. in `whitebox.css-stories.ts` en/of voor de Core implementatie, bijv. in `tooltip.core-stories.ts`.
      Etaleren we het component ook in de Angular en/of React storybook dan voegen we ook daar de suffix `(Deprecated)` toe.
    - Dit doen we op de website in de betrefende mdx-file van het component. Hierbij moet ook het name-attribuut van
      het `StorybookComponent` toegevoegd of aangepast worden, bijv.: `name="whitebox-deprecated"`.
    - Pas ook in `storybook/cypress/fixtures/image-snapshot-components.json` het name-attribuut aan van het
      betreffende component aan.
    - Pas ook in de e2e-test de url van `cy.visit` aan, bijv. voor `Tooltip` in `storybook/cypress/e2e/tooltip.cy.ts`: `cy.visit("http://localhost:45000/iframe.html?id=core-tooltip-deprecated--as-child");`
3.  In de lit-html template van het betreffende component in storybook voegen we 2 HTML comments toe: aan het begin `<!-- START DEPRECATED -->` en aan het eind `<!-- END DEPRECATED -->`
4.  We maken een nieuw issue aan om de functionaliteit (het component) in de toekomst te verwijderen.
