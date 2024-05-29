# dso-annotation-omgevingsnorm



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                                                         | Type                                                                                                           | Default     |
| ------------------- | -------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------- |
| `active`            | `active`             | Een optionele boolean die aangeeft of de annotatie actief is.                       | `boolean \| undefined`                                                                                         | `undefined` |
| `eenheid`           | `eenheid`            | De eenheid van de omgevingsnorm.                                                    | `string \| undefined \| { toegevoegd: string; } \| { verwijderd: string; } \| { was: string; wordt: string; }` | `undefined` |
| `gewijzigdeLocatie` | `gewijzigde-locatie` | Een optionele boolean die aangeeft of de locatie van de annotatie gewijzigd is.     | `boolean \| undefined`                                                                                         | `undefined` |
| `naam`              | `naam`               | De naam van de omgevingsnorm                                                        | `string \| undefined \| { toegevoegd: string; } \| { verwijderd: string; } \| { was: string; wordt: string; }` | `undefined` |
| `symbool`           | `symbool`            | Een URL naar de verbeelding van de legenda.                                         | `string \| undefined`                                                                                          | `undefined` |
| `waardes`           | --                   | De waardes van de omgevingsnorm.                                                    | `(string \| AnnotationDiff)[] \| undefined`                                                                    | `undefined` |
| `wijzigactie`       | `wijzigactie`        | Een optionele wijzigactie die aangeeft of de annotatie toegevoegd of verwijderd is. | `"verwijderd" \| "voegtoe" \| undefined`                                                                       | `undefined` |


## Events

| Event             | Description                                                                   | Type                                       |
| ----------------- | ----------------------------------------------------------------------------- | ------------------------------------------ |
| `dsoActiveChange` | Een optionele event listener voor wijzigingen aan de status van de annotatie. | `CustomEvent<AnnotationActiveChangeEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
