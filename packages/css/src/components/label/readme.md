# `.dso-label`

**Let op**: In de `.sr-only` moet _na_ de dubbele punt (:) een whitespace staan.

Deze staat nu niet in de markup voorschriften maar wordt wel gerendered in het DOM. Dit is een bug in een Storybook plugin. Zie #1163 voor meer informatie.

De hover state voor het Web Component is onderdeel van de werkvorm, voor de CSS versie moet deze door developers worden geimplementeerd dmv. class `.dso-label-hover` op de `<span class="dso-label">`;
