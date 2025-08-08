---
name: Change
about: Wijzigingen aan bestaande functionaliteit
title: "COMPONENT: SAMENVATTING"
---

## Omschrijving van de wijziging

_Beschrijf duidelijk wat de gewenste wijziging inhoudt en wat de beoogde functionaliteit is. Geef hierbij voldoende details zodat het team een goed begrip heeft van wat er gevraagd wordt._

---

## Kaders van de wijziging

_Geef aan op welke componenten de wijzigingen van toepassing zijn._

---

## Ontwerp

- **Ontwerp in Figma**: _beschrijf waar het ontwerp te vinden is in de Figma bibliotheek._
- **Toelichting**: Het visuele en functionele ontwerp staat in Figma. Indien nodig, geef aanvullende uitleg voor de technische implementatie.

---

## Toegankelijkheid

_Controleer of de wijziging voldoet aan de toegankelijkheidseisen (WCAG 2.1 of hoger)._

---

## Impactanalyse

**Breaking change?**: Ja/nee. _Indien ja, beschrijf de impact en wat er nodig is voor een migratie._

---

## Wijzigingen aan het Component Model

_Geef aan of de wijziging invloed heeft op het Component Model en licht dit toe._

```ts
interface PropertyModel {}

interface ComponentModel {
  nieuweProperty: PropertyModel;
}
```

---

## Overige opmerkingen

_Voeg eventuele aanvullende informatie of vragen toe._

## Checklist

- [ ] Omschrijving van de wijziging
- [ ] Kaders van de wijziging
- [ ] Ontwerp
- [ ] Toegankelijkheid
- [ ] Impactanalyse
- [ ] Wijzigingen aan het Component Model
- [ ] Overige opmerkingen
