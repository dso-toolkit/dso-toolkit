# Change Management Notatie

Dit document beschrijft hoe wij changes noteren.

Een correcte beschrijving van een change bestaat uit:

- Type
- Scope
- Samenvatting

## Type

Een van de volgende:

- Added
- Changed
- Removed
- Fixed
- Docs
- Task

## Scope

Er is geen vaste lijst voor scope. De scope beschrijft het onderdeel van de change. Dit kan bijvoorbeeld een component zijn, of een hele package.

In het geval van een component kan een variant tussen haakjes worden gezet.

- Alert
- Highlight Box (Yellow)
- Build
- Linting

Let op de [casing van componenten](./schrijfwijze-componenten.md).

Elke change begint bij een GitHub issue.

### Samenvatting

Een korte samenvatting van de change.

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

* [#ISSUE_ID](ISSUE_URL) SCOPE: SUMMARY
```

Met `[]()` wordt een Markdown link gemaakt. ISSUE_URL is `https://www.github.com/dso-toolkit/dso-toolkit/issues/ISSUE_ID`.

## Commit message

De éérste commit message bestaat is altijd opgemaakt volgens:

```
#ISSUE_ID [TYPE] SCOPE: SAMENVATTING
```

De opvolgende commit messages hoeven alleen te beginnen met het #ISSUE_ID.

## GitHub pull request

De titel van het pull request:

```
#ISSUE_ID SCOPE: SAMENVATTING
```
