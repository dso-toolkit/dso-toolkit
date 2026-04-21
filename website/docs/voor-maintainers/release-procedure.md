# Release procedure

Op deze pagina wordt de procedure van het releasen van een nieuwe versie van de DSO Toolkit beschreven.
Een release heeft een [SemVer](https://www.semver.org/) versienummer en een emoji.
De emoji wordt gebruikt in de `CHANGELOG.md`, de release commit message, de Github milestone en de aankondiging van de release in Slack.
De emoji die gekozen wordt mag nog niet eerder gebruikt zijn. Controleer dit door de emoji te zoeken in de `CHANGELOG.md`. Komt de emoji niet voor dan mag die gebruikt worden.

In de beschrijving van de release procedure wordt versie `67.0.0` en emoji 😍 als voorbeeld gebruikt.
Alle commando's moeten in de root van het project op de lokale computer van de developer worden uitgevoerd.

Dit is de release procedure:

1.  Check lokaal de `master`-branch uit en zorgt dat deze up-to-date is.
2.  Controleer dat de Github milestone `67.0.0` volledig is. Zijn de issues van alle squash-commits in de
    `master`-branch sinds de vorige release toegevoegd aan de milestone? De Github milestones van DSO Toolkit
    zijn hier te vinden: https://github.com/dso-toolkit/dso-toolkit/milestones.
3.  Voer het commando `yarn release --version 67.0.0 --emoji 😍` uit:

    Toelichting:
    - In `CHANGELOG.md` voegt dit script bovenin onder `## Next` een kop toe met daarin de emoji van de release, het
      versienummer en de datum van de release:

      `## 😍 Release 67.0.0 - 2024-11-14`.

    - In de `package.json` van `angular-workspace/projects/component-library`, `packages/react`, `packages/core` en `packages/dso-toolkit` wordt het versienummer bijgewerkt.
    - In de `package.json` van `angular-workspace/projects/component-library` en `packages/react` wordt het versienummer van de peerDependency `@dso-toolkit/core` bijgewerkt.

4.  Voer het commando `yarn` uit, zodat `yarn.lock` wordt geüpdatet met de aangepaste peerDependency naar `@dso-toolkit/core`.
5.  Controleer de filenaam van de blogpost de juiste datum en naam bevatten (datum/versie) b.v.: 2024-11-14-dso-toolkit-67.0.0.mdx.
    Controleer ook in de blogpost of de versie en emoji correct staan.
6.  De 6 of 7 resulterende gewijzigde bestanden (4x `package.json`, `CHANGELOG.md` en `yarn.lock`, eventueel aangevuld
    met de gecorrigeerde naam van de blogpost) moeten gecommit worden op de `master`-branch met de volgende
    commit-message: `😍 Release 67.0.0`.
    Vervolgens pushen we deze release-commit naar origin. Dit triggert een build van de `master`-branch.
7.  Wanneer de build van de `master`-branch gereed is, voorzien we de release-commit van de tag `v67.0.0`. Dit
    triggert de release-build, die resulteert in het publiceren van versie `67.0.0` van de 4 npm-packages:
    `@dso-toolkit/core`, `dso-toolkit`, `@dso-toolkit/angular` en `@dso-toolkit/react`.
8.  Als de release-build gereed is versturen we in Slack in 3 workspaces/channels een aankondiging. Dat doen we in
    #general van DSO Toolkit, #dso-obo-release van Kadaster-IT en #release_toolkit van DSO-LV. Dit is een voorbeeld
    van de aankondiging:

    > 😍 Zojuist is DSO Toolkit 67.0.0 uitgekomen. Bekijk de [CHANGELOG](https://github.com/dso-toolkit/dso-toolkit/blob/master/CHANGELOG.md#-release-6700---2024-11-14) en de [blogpost](https://www.dso-toolkit.nl/67.0.0/blog).

    De verwijzing in het bericht naar de blogpost is optioneel.

9.  Controleer vervolgens of `What's Changed`-sectie van de [release tag](https://github.
    com/dso-toolkit/dso-toolkit/releases/tag/v67.0.0) in github volledig is. Is dit niet het geval  
    dan moet deze nog handmatig worden aangevuld.
10. Als laatste kan de Github milestone gesloten worden door op
    https://github.com/dso-toolkit/dso-toolkit/milestones van milestone `67.0.0` eerst op "edit" te klikken,
    de Due date in te vullen en vervolgens op "Close milestone" te klikken.

## Een branch release uitbrengen

Een branch release gebruiken we als we een afnemer een sneak preview willen geven of als we willen verifiëren of een
wijziging in een component veilig gereleased kan worden.

- Een branch release wordt gemaakt vanuit de branch van het GitHub issue of vanuit de branch van de pre-release.
- Zorg dat de branch direct aftakt van de laatste officiële release commit.
- Voorbeeld: `67.0.0`.
- Als het GitHub issue nummer `2345` is, dan wordt de eerste branch-releaseversie `67.0.0-ghi-2345.0`.
- Elke volgende branch release voor hetzelfde issue verhoogt alleen het nummer achter de laatste punt: `67.0.0-ghi-2345.1`,
  `67.0.0-ghi-2345.2`, enzovoort.
- Loopt de doorlooptijd over meerdere reguliere releases heen, dan moet de branch release of pre-release worden
  aangepast naar de meest recente officiële release.
- Voorbeeld: als `67.1.0` inmiddels is uitgekomen, dan wordt `67.0.0-ghi-2345.0` aangepast naar
  `67.1.0-ghi-2345.1`.

### Meerdere issues in één branch release

- Soms willen we meerdere GitHub issues tegelijk releasen in één branch release.
- Gebruik daarvoor een pre-release als meerdere issues door een afnemer geverifieerd moeten worden.
- Voorbeeld branch: `79.0.0-pre`.
- Voorbeelden van tags: `v79.0.0-pre.0`, `v79.0.0-pre.1`, enzovoort.
- De resulterende versies zijn dan `79.0.0-pre.0`, `79.0.0-pre.1`, enzovoort.
- De eerste versie van zo'n pre-release begint op de eerstvolgende officiële release, bijvoorbeeld `79.0.0-pre.0`.
- Let op dat een tag zoals `79.0.0-pre` niet gebruikt moet worden als npm-tag, omdat die als een geldige SemVer-range
  wordt gezien.

### Branch release uitvoeren

- Voordat je begint aan de onderstaande stappen is het zaak dat je een npm-account hebt met toegang tot alle DSO packages: dso-toolkit, @dso-toolkit/core, @dso-toolkit/angular, @dso-toolkit/react.
- Tak de branch af van de laatste release
- Kies een emoji.
- Voer `yarn release --version 67.0.0-ghi-2345.0 --emoji <emoji>` uit, of voor een pre-release:
  `yarn release --version 67.0.0-pre.0 --emoji <emoji>`.
- Voer daarna nogmaals `yarn` uit, zodat ook `yarn.lock` wordt aangepast.
- Breng eventuele blogposts in lijn met de nieuwe versie.
- Commit en push de resulterende bestanden met als commit message bijvoorbeeld `Release 67.0.0-ghi-2345.0`.
- Wacht tot de CI/CD action klaar is.
- Push daarna de tag `v67.0.0-ghi-2345.0`, of de tag voor de pre-release.

Let op: Voor angular is een apart release proces nodig voor de branch release. NPM kan de branch release niet
automatisch publiceren wanneer het geen `latest` tag heeft.

- Build eerst angular workspace: `yarn workspace angular-workspace build`
- Voer vanuit de `angular-wordspace` folder een npm publish script uit: `npm publish --tag 67.0.0-ghi-2345.0`

### Tagging corrigeren na branch release

- Na afloop van de CI/CD action moet de tagging in GitHub en npm weer worden rechtgezet.
- Voor GitHub betekent dit dat de `latest` tag teruggezet moet worden op de laatste reguliere release, of dat de
  pre-release expliciet als pre-release wordt gemarkeerd.
- Voor npm moeten de dist-tags worden gecorrigeerd voor de volgende packages:
  - `dso-toolkit`
  - `@dso-toolkit/core`
  - `@dso-toolkit/angular`
  - `@dso-toolkit/react`
- Zet `latest` terug op de laatste reguliere release, bijvoorbeeld `67.0.0`:

```bash
  npm login
  npm dist-tag add dso-toolkit@67.0.0 latest
  npm dist-tag add @dso-toolkit/core@67.0.0 latest
  npm dist-tag add @dso-toolkit/angular@67.0.0 latest
  npm dist-tag add @dso-toolkit/react@67.0.0 latest
```

- Zet de branch-release-tag, bijvoorbeeld `ghi-2345`, op de branch release:

  ```bash
  npm dist-tag add dso-toolkit@67.0.0-ghi-2345.0 ghi-2345
  npm dist-tag add @dso-toolkit/core@67.0.0-ghi-2345.0 ghi-2345
  npm dist-tag add @dso-toolkit/angular@67.0.0-ghi-2345.0 ghi-2345
  npm dist-tag add @dso-toolkit/react@67.0.0-ghi-2345.0 ghi-2345
  ```

- Stuur daarna een bericht naar de afnemer waarvoor de branch release is gemaakt.

### Branch release goed bevonden

- Drop de release commit waarin de versie naar de betreffende github issue is gezet. Bijv `67.0.0-ghi-2345`.
- Bied de code via een PR aan zodat deze mee gaat in het reguliere release proces.
