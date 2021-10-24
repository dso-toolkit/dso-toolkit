# `.dso-viewer-grid`

Het Viewer Grid bestaat uit drie panelen:

* Main: voor de tekstuele inhoud
* Map: voor de kaart
* Overlay: voor extra informatie.

Het grid begint bij een root element `.dso-viewer-grid` en heeft voor elk paneel één element:

* `.dso-viewer-grid-main`: Indien gewenst kan dit het blockelement `main` zijn.
* `.dso-viewer-grid-map`
* `.dso-viewer-grid-overlay`: Indien toepasbar kan dit het blockelement `aside` zijn.

Het paneel "main" kan drie verschillende maten krijgen. De gewenste maat wordt op het root element aangegeven en kan één van de volgende zijn:

* Small. `.dso-viewer-grid-small`, 375px.
* Medium `.dso-viewer-grid-medium`, 624px.
* Large `.dso-viewer-grid-large`, 60%, niet kleiner dan 768px en niet groter dan 1024px.

Dit grid gaat ervanuit dat het op het visuele punt linksboven (0, 0) geplaatst wordt. In het paneel "main" en "overlay" kan het normale grid gebruikt worden. Let erop dat het normale grid een responsive grid is en dus luistert naar de viewport en niet naar de breedte van de panelen.

## `.dso-viewer-grid-main`

In dit element staan de sizing buttons waarmee de gebruiker het paneel op de gewenste breedte kan zetten. Als de kleinste maat is geselecteerd moet de "kleiner maken" knop `disabled` worden. Hetzelfde geldt voor de grootste maat en de "groter maken" knop. Vanuit de styling is geregeld dat de knoppen verdwijnen met `display: none`.

## `.dso-viewer-grid-map`

Dit element heeft geen paddings of margings en pakt de maximale resterende breedte en maximale hoogte.

## `.dso-viewer-grid-overlay`

Dit paneel heeft een sluitenknop en is altijd 624px breed. Het paneel wordt verborgen met het `hidden` attribuut of niet in het DOM geplaatst.

Als het paneel toont ligt er een dimmende overlay over de rest van het grid. De implementator moet er zorg voor dragen dat de rest van de applicatie niet meer te bedienen is. Dit kan door alle elementen buiten het paneel "overlay" een `tabindex=0` te geven of een focus trap te activeren.
