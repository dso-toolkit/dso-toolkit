# Refinement estimates

Als hulpmiddel bij het inschatten van de complexiteit en omvang van een issue, hanteren we onderstaande lijst.
We hanteren de volgende estimates: 1, 2, 3, 5 en, onze maximale estimate, 8.
Per estimate staat er een lijstje met een aantal beschrijvingen van wat voor soort issue de estimate betrekking op
heeft.

1

- Typo

2

- Package updates
- Simpele aanpassing aan bestaand component
- Licht nadenkwerk
- Verwijderen van een component of HTML/CSS
- PeerDependency updates
- Icoon toevoegen of aanpassen
- Deprecation

3

- Aanpassing aan bestaand component (nieuwe variant, nieuwe opties, Storybook configuratie, modellering, templates, e2e tests)
- Nieuw simpel component
- Omvangrijke code change (geen diepgaand onderzoek nodig, geen complexe wijziging)

5

- Complexe falende e2e test
- Complexe aanpassing aan bestaand component
- Complexe breaking change update van dependency (recursief, lokale patches)
- Niet complex maar de kwantiteit van de gewenste aanpassingen
- Onbekende materie, niet per se complex

8

- Meerdere complexe aanpassingen aan component, die integraal doorgevoerd moeten worden.
- Veel
- Raakt veel code
- Hoog regressierisico
- Onbekend en complex
