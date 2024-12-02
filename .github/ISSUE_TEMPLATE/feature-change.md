---
name: Feature/Change
about: Toevoegingen en wijzigingen
title: "COMPONENT: SAMENVATTING"
labels: ""
---

## Omschrijving van de wijziging

Beschrijf duidelijk wat de gewenste wijziging inhoudt en wat de beoogde functionaliteit is. Geef hierbij voldoende details zodat het team een goed begrip heeft van wat er gevraagd wordt.

---

## Kaders van de wijziging

Geef aan op welke componenten de wijzigingen van toepassing zijn.

---

## Ontwerp

- **Ontwerp in Figma**: beschrijf waar het ontwerp te vinden is in de Figma bibliotheek.
- **Toelichting**: Het visuele en functionele ontwerp staat in Figma. Indien nodig, geef aanvullende uitleg voor de technische implementatie.

---

## Toegankelijkheid

Controleer of de wijziging voldoet aan de toegankelijkheidseisen (WCAG 2.1 of hoger).

---

## Impactanalyse

**Breaking change?**: Ja/nee. Indien ja, beschrijf de impact en wat er nodig is voor een migratie.

---

## Wijzigingen aan het Component Model

Geef aan of de wijziging invloed heeft op het Component Model en licht dit toe.

```ts
interface PropertyModel {}

interface ComponentModel {
  nieuweProperty: PropertyModel;
}
```

---

## Overige opmerkingen

Voeg eventuele aanvullende informatie of vragen toe.

## Checklist

- [ ] Omschrijving van de wijziging
- [ ] Kaders van de wijziging
- [ ] Ontwerp
- [ ] Toegankelijkheid
- [ ] Impactanalyse
- [ ] Wijzigingen aan het Component Model
- [ ] Overige opmerkingen
