# Ozon dekkingsgraad
## `<Figuur>`
Bron: [1.4.0](https://koop.gitlab.io/STOP/voorinzage/standaard-preview-b/tekst_xsd_Element_tekst_InlineTekstAfbeelding.html)
(Namespace: tekst)

```mermaid
graph TB;
    Figuur:::partial --> Titel
    Figuur --> Illustratie
    Figuur --> Bijschrift:::partial
    Figuur --> Bron:::partial
    Figuur --> AttributesFiguur
    Illustratie:::partial --> AttributesIllustratie
    Bron --> Attributes
    Bron --> VerwijderdeTekst:::supported
    Bron --> NieuweTekst:::supported
    Bijschrift --> AttributesBijschrift
    Bijschrift --> VerwijderdeTekst:::supported
    Bijschrift --> NieuweTekst:::supported
    Titel:::partial --> AttributesTitel
    Titel --> VerwijderdeTekst:::supported
    Titel --> NieuweTekst:::supported
    VerwijderdeTekst --> Contact:::unsupported
    VerwijderdeTekst --> Noot:::partial
    VerwijderdeTekst --> Nootref:::unsupported
    NieuweTekst --> Contact:::unsupported
    NieuweTekst --> Noot:::partial
    NieuweTekst --> Nootref:::unsupported
    
    subgraph Attributes
        agWijzigactie["@agWijzigactie"]:::unsupported
        agAlgemeen["@agAlgemeen"]:::nvt
    end
    subgraph AttributesFiguur
        ___agWijzigactie["@agWijzigactie"]:::supported
        ___agAlgemeen["@agAlgemeen"]:::nvt
        ___agAKN:::nvt
    end
    subgraph AttributesTitel
        __agWijzigactie["@agWijzigactie"]:::unsupported
        __agAlgemeen["@agAlgemeen"]:::nvt
    end
    
    subgraph AttributesBijschrift
        _agWijzigactie["@agWijzigactie"]:::unsupported
        _agAlgemeen["@agAlgemeen"]:::nvt
        locatie:::supported
    end
    subgraph AttributesIllustratie["Attributes Illustratie"]
        agWijzigactieITA["@agWijzigactie"]:::unsupported
        agAlgemeen["@agAlgemeen"]:::nvt
        agIllustratie["@agIllustratie"]:::partial --> AttribuutGroepIllustratie
    end
    subgraph AttribuutGroepIllustratie["AttribuutGroep agIllustratie"]
        alt:::supported;
        breedte:::unsupported;
        hoogte:::unsupported;
        dpi:::unsupported;
        formaat:::unsupported;
        naam:::supported;
        kleur:::unsupported;
        uitlijning:::unsupported
    end

    classDef unsupported fill:#f3cfd3,color:red
    classDef supported fill:green
    classDef partial fill:#fffcb6,color:black
    classDef nvt fill:grey,color:darkgrey
```

`Titel`: slecht de textcontent:
```tsx
const titel = childNodes.find((n) => getNodeName(n) === "Titel")?.textContent;
```
`Titel` is een complex type en kan weer verschillende andere elementen bevatten, welke we nog niet verwerken.

Slecht de wijzigactie op Figuur dekken we. De wijgactie op Titel, Illustratie, Bijschrift en Bron negeren we momenteel. 
