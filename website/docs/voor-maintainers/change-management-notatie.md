# Change Management Notatie

Dit document beschrijft hoe wij te werk gaan bij het communiceren van changes in het CHANGELOG en in onze commits en Pull Requests. Hierin houden we bepaalde formules aan zodat het eenvoudig is om ook ver in de toekomst terug te zien wanneer een bepaalde change gedaan is en waarom.

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
Hiervoor gebruiken we altijd één van de volgende trefwoorden:

- Added
- Changed
- Deprecated
- Docs
- Fixed
- Removed
- Task

Dit geeft ons niet alleen het voordeel van een schone Git history, maar ook pas op de plaats om in het CHANGELOG wijzigingen van hetzelfde soort te groeperen voor de leesbaarheid.

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

Elke change wordt in de CHANGELOG in een groep gedocumenteerd. Het type wordt gebruikt om de groep te bepalen. Nieuwe changes worden altijd onder de volgende release ("Next") geplaatst.

Het format voor een CHANGELOG entry is:

```
## Next

### GROEP

* SCOPE: SUMMARY ([#ISSUE_ID](ISSUE_URL))
```

Met `[]()` wordt een Markdown link gemaakt. ISSUE_URL is `https://www.github.com/dso-toolkit/dso-toolkit/issues/ISSUE_ID`.

### Voorbeeld

Een voorbeeld van een goede CHANGELOG entry ziet er zo uit:

```
## Next

### Fixed

* Banner: Tooltip/toggletip verkeerde link-kleur ([#2305](https://github.com/dso-toolkit/dso-toolkit/issues/2305))
```

Bekijk voor meer goede voorbeelden [de broncode van het huidige CHANGELOG](https://raw.githubusercontent.com/dso-toolkit/dso-toolkit/master/CHANGELOG.md).

## Commit message

De éérste commit message is altijd opgemaakt volgens de volgende formule:

```
#ISSUE_ID [TYPE] SCOPE: SAMENVATTING
```

De opvolgende commit messages hoeven alleen te beginnen met het #ISSUE_ID.

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
