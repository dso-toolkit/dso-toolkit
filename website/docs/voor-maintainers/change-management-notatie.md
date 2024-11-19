# Change Management Notatie

Dit document beschrijft hoe wij vanaf ✍️ Release 67.0.0 te werk gaan bij het communiceren van changes in het CHANGELOG en in onze commits en Pull Requests. Hierin houden we bepaalde formules aan zodat het eenvoudig is om ook ver in de toekomst terug te zien wanneer een bepaalde change gedaan is en waarom.

Een correcte beschrijving van een change bestaat uit:

- [`GitHub Issuenummer`](#github-issuenummer)
- [`Type`](#type)
- [`Scope`](#scope)
- [`Samenvatting`](#samenvatting)

Al deze informatie zorgen er samen voor dat in 1 zin zo duidelijk mogelijk wordt wat het antwoord is op de volgende vragen:

- 'Wat?' (`type` en `samenvatting`)
- 'Waarom?' (`issuenummer`)
- 'Waar?' (`scope`)

'Wie?', 'Wanneer?' en 'Hoe?' worden door GitHub beantwoord in de meta informatie van het issue.

## GitHub Issuenummer

We verwijzen in elke aantekening in het CHANGELOG, en in iedere commit van een Pull Request naar het issuenummer waarin we de feature, bug of deprecation aankaarten, documenteren en bespreken. Dit is waarom:

- Het CHANGELOG kan elke DSO Toolkit gebruiker lezen welke wijzigingen er in een bepaalde release bij zijn gekomen. Met een duidelijke vermelding van het issuenummer kunnen zij doorklikken en zien waarom bepaalde wijzigingen tot stand zijn gekomen.
- Als je een commit voorziet van het issuenummer, zien gebruikers die het issue hebben aangekaart of erover mee praten hoe het vordert met het oplossen of uitvoeren van het issue.

## Type

Met `type` bedoelen we het soort change dat is uitgevoerd.
We hanteren 7 verschillende types change:

- Feature
- Change
- Deprecate
- Docs
- Bug
- Removed
- Task

Dit geeft ons niet alleen het voordeel van een schone Git history, maar ook pas op de plaats om in het CHANGELOG wijzigingen van hetzelfde soort te groeperen voor de leesbaarheid.
Dan is het ook nog mogelijk dat een change, naast 1 van de 7 hierboven genoemde types, **BREAKING** kan zijn.

## Scope

Er is geen vaste lijst trefwoorden voor `scope`. De `scope` beschrijft het onderwerp van de change. Dit kan bijvoorbeeld een component zijn, of een hele package.

In het geval van een component kan een variant tussen haakjes worden gezet. Denk bijvoorbeeld aan:

- Alert
- Highlight Box (Yellow)
- Build
- Linting

Let op de [casing van componenten](./schrijfwijze-componenten.md). Als je `scope` uit meer dan 1 woord bestaat, gebruiken we "Spaced Pascal Case". Dit komt neer op elk woord (van de `scope`) met een hoofdletter, en elk woord onderling gescheiden door middel van een spatie.

## Samenvatting

De samenvatting vat kort samen welke wijziging je hebt uitgevoerd.

## GitHub issue

De titel van het issue is:

```
SCOPE: SAMENVATTING
```

## CHANGELOG.md

Elke change wordt in de CHANGELOG in een groep gedocumenteerd. De titel van de groep is het type. Met uitzondering
van het type `Removed`; daarvoor gebruiken we `Remove` als titel van de groep in de CHANGELOG. Zonder `d` op het
eind. Nieuwe changes worden altijd onder de volgende release ("Next") geplaatst.

Het format voor een non-**BREAKING** CHANGELOG-aantekening is:

```
## Next

### GROEP
* SCOPE: SUMMARY ([#ISSUE_ID](ISSUE_URL))
```

Het format voor een **BREAKING** CHANGELOG-aantekening is:

```
## Next

### GROEP
* **BREAKING** SCOPE: SUMMARY ([#ISSUE_ID](ISSUE_URL))
```

Met `[]()` wordt een Markdown link gemaakt. ISSUE_URL is `https://www.github.com/dso-toolkit/dso-toolkit/issues/ISSUE_ID`.

### Voorbeelden

Hieronder een aantal voorbeelden van goede CHANGELOG-aantekeningen:

```
## Next

### Feature
* Document Component: type "inhoudsopgave" ([#2271](https://github.com/dso-toolkit/dso-toolkit/issues/2271))
* **BREAKING:** Accordion: Badge vervangen met Label ([#2774](https://github.com/dso-toolkit/dso-toolkit/issues/2774))

### Change
* Header: ShadowRoot ([#2365](https://github.com/dso-toolkit/dso-toolkit/issues/2365))

### Remove
* Input Number: Verwijder component ([#2708](https://github.com/dso-toolkit/dso-toolkit/issues/2708))

### Bug
* Banner: Tooltip/toggletip verkeerde link-kleur ([#2305](https://github.com/dso-toolkit/dso-toolkit/issues/2305))

### Task
* Packages: Dependencies updates ([#2863](https://github.com/dso-toolkit/dso-toolkit/issues/2863))
```

## Commit message

De <u>éérste</u> commit message is altijd opgemaakt volgens de volgende formule:

```
#ISSUE_ID [RESOLUTION] SCOPE: SAMENVATTING
```

De resolution in een commit message is afhankelijk van het type change. In onderstaande tabel staat welke resolution
(en welke titel van de groep in de CHANGELOG) bij welke type change horen:

| Type change   | Github issue label | Titel groep in CHANGELOG | Resolution in commit message |
| ------------- | ------------------ | ------------------------ | ---------------------------- |
| **Feature**   | feature            | Feature                  | Added                        |
| **Change**    | change             | Change                   | Changed                      |
| **Deprecate** | deprecate          | Deprecate                | Deprecated                   |
| **Docs**      | docs               | Docs                     | Docs                         |
| **Bug**       | bug                | Bug                      | Fixed                        |
| **Removed**   | remove             | Remove                   | Removed                      |
| **Task**      | task               | Task                     | Task                         |

De <u>opvolgende</u> commit messages hoeven alleen te beginnen met het #ISSUE_ID.

### Voorbeeld

Een voorbeeld van een goede eerste commit message ziet er zo uit:

```
#2305 [Fixed] Banner: Tooltip/toggletip verkeerde link-kleur
```

Waarbij dan elk opeenvolgende commit zou beginnen met `#2305`.

## GitHub pull request

De titel van het pull request:

```
#ISSUE_ID SCOPE: SAMENVATTING
```

### Voorbeeld

Een goede titel van een pull request ziet er zo uit:

```
#2240 Document Component: Diverse bevindingen
```

Soms zetten we het type aanpassing hier ook bij.
