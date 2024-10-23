# Ozon dekkingsgraad
## `<Label>`
Bron: [1.4.0](https://koop.gitlab.io/STOP/voorinzage/standaard-preview-b/tekst_xsd_Element_tekst_Label.html)
(Namespace: tekst)

```mermaid
graph TB;
    Label:::partial --> i:::supported
    Label --> b:::supported
    Label --> VerwijderdeTekst:::supported
    Label --> NieuweTekst:::supported
    Label --> Attributes
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

    classDef unsupported fill:#f3cfd3,color:red
    classDef supported fill:green
    classDef partial fill:#fffcb6,color:black
    classDef nvt fill:grey,color:darkgrey
```

`Label` wordt binnen `ozon-content` verwerkt door `fallback.node.tsx` en daarom ondersteunen we het 
attribuut `wijzigactie=voegtoe|verwijder` niet. Wel support voor `VerwijderdeTekst` en `NieuweTekst`.
`VerwijderdeTekst` en `NieuweTekst` kunnen o.a. `Contact`, `Nootref` en `Noot` bevatten.

Vraag: Welke situatie wordt er gedekt met `wijzigactie=voegtoe` en `wijzigactie=verwijder`?
