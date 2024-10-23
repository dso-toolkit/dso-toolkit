# Ozon dekkingsgraad
## `<Kop>`
Bron: [1.4.0](https://koop.gitlab.io/STOP/voorinzage/standaard-preview-b/tekst_xsd_Element_tekst_Kop.html)
(Namespace: tekst)

```mermaid
graph TB;
    Kop:::unsupported --> Label:::partial
    Kop --> Nummer:::partial
    Kop --> Opschrift:::partial
    Kop --> Subtitel
    Kop --> Attributes
    Subtitel:::unsupported --> Attributes
    subgraph Attributes
        agWijzigactie["@agWijzigactie"]:::unsupported
        agAlgemeen["@agAlgemeen"]:::nvt
    end

    classDef unsupported fill:#f3cfd3,color:red
    classDef supported fill:green
    classDef partial fill:#fffcb6,color:black
    classDef nvt fill:grey,color:darkgrey
```

`Kop` en `Subtitel` worden binnen `ozon-content` verwerkt door `fallback.node.tsx` en daarom ondersteunen we het 
attribuut `wijzigactie=voegtoe|verwijder` niet. 
