# `ul.nav.nav-tabs`

De rollen `tablist`, `tab` en `tabpanel` tonen de elementen `<ul>`, `<a>` en `<div>` als een verzameling tabbladen en bijbehorende tabbladen in de toegankelijkheidsboom.

De rol `presentation` voorkomt dat de `<li>`-elementen in kaart worden gebracht in de toegankelijkheidsboom.

Het `aria-selected` kenmerk geeft aan welk tabblad momenteel is geselecteerd.

Het `tabindex`-attribuut zorgt ervoor dat alleen het momenteel geselecteerde tabblad in de tabvolgorde wordt opgenomen.

Het `hidden` attribuut verbergt alles behalve het momenteel weergegeven tabpaneel voor weergave.

Het kenmerk `aria-controls` legt een relatie tussen elk tabblad en het bijbehorende tabblad.

Het kenmerk `aria-labelledby` hergebruikt de naam van het tabblad als de toegankelijke naam van het bijbehorende tabblad.

De `click`- en `keydown`- event listeners leggen de verwachte muis- en toetsenbordgebeurtenissen vast voor het activeren van de tabbladen. Scriptend moet ervoor gezorgd worden dat de a daarin niet meer reageert.
