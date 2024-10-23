# Ozon dekkingsgraad
## `<Illustratie>`
Bron: [1.4.0](https://koop.gitlab.io/STOP/voorinzage/standaard-preview-b/tekst_xsd_Element_tekst_InlineTekstAfbeelding.html)
(Namespace: tekst)

```mermaid
graph TB;
    Illustratie:::partial --> AttributesIllustratie
    
    subgraph AttributesIllustratie["Attributes Illustratie"]
        agWijzigactieITA["@agWijzigactie"]:::supported
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
