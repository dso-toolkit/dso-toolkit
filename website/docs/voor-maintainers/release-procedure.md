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
5.  De 6 resulterende gewijzigde bestanden (4x `package.json`, `CHANGELOG.md` en `yarn.lock`) moeten gecommit worden op de `master`-branch met de volgende commit-message: `😍 Release 67.0.0`. Vervolgens pushen we deze release-commit naar origin. Dit triggert een build van de `master`-branch.
6.  Wanneer de build van de `master`-branch gereed is, voorzien we de release-commit van de tag `v67.0.0`. Dit
    triggert de release-build, die resulteert in het publiceren van versie `67.0.0` van de 4 npm-packages:
    `@dso-toolkit/core`, `dso-toolkit`, `@dso-toolkit/angular` en `@dso-toolkit/react`.
7.  Als de release-build gereed is versturen we in Slack in 3 workspaces/channels een aankondiging. Dat doen we in
    #general van DSO Toolkit, #dso-obo-release van Kadaster-IT en #release_toolkit van DSO-LV. Dit is een voorbeeld
    de aankondiging:

    > 😍 Zojuist is DSO Toolkit 67.0.0 uitgekomen. Bekijk de [CHANGELOG](https://github.com/dso-toolkit/dso-toolkit/blob/master/CHANGELOG.md#-release-6700---2024-11-14) en de [blogpost](https://www.dso-toolkit.nl/67.0.0/blog).

    De verwijzing in het bericht naar de blogpost is optioneel.

8.  Als laatste kan de Github milestone gesloten worden door op
    https://github.com/dso-toolkit/dso-toolkit/milestones van milestone `67.0.0` eerst op "edit" te klikken,
    de Due date in te vullen en vervolgens op "Close milestone" te klikken.
