# `.dso-dropdown-menu`

## Implementatie

Het openen en sluiten van de dropdown button moet worden ondersteund met muis-, touch- en toetsenbordbediening.
De scripting zal zelf geïmplementeerd moeten worden, waarbij het te programmeren gedrag op de diverse relevante toetsen gelijk moet zijn aan de native browser dropdown/select werkvorm (en het Web Component).

- `event.code` `ArrowUp` : omhoog, vorige 'option', zelfde als tab
- `event.code` `ArrowDown` : omlaag, volgende 'option', zelfde als shift-tab
- `event.code` `Escape` : sluit dropdown, geen keuze maken
- `event.code` `Space` : maak keuze

## Voorschriften/algemeen

- `.dso-dropdown-menu` is de root van het component, dat bestaat uit een `button` en het daadwerkelijke menu, de `.dso-dropdown-options`;
- `.dso-dropdown-options` heeft `role="menu"` en verwijst met `aria-labelledby` naar de `button`;
- `.dso-dropdown-options` wordt getoond wanneer `.dso-dropdown-menu` de class `dso-open` heeft;
- de links in het menu krijgen `role="menuitemradio"` en het geselecteerde item `aria-checked="true"`;
- `button` heeft attribute `aria-haspopup="menu"` om aan te duiden dat deze een menu bedient, en moet een `id` hebben waarnaar verwezen wordt vanuit `.dso-dropdown-options` met een `aria-labelledby`-attribuut

### Menu ingeklapt

- `.dso-dropdown-menu` geen class `dso-open`
- `button` attribute `aria-expanded="false"`

```
<div class="dso-dropdown-menu">
  <button type="button" aria-haspopup="true" aria-expanded="false" class="dso-tertiary">
  <div class="dso-dropdown-options" ... > ...
</div>
```

## Menu uitgeklapt

- `div.dropdown` heeft class `dso-open`
- `button` attribute `aria-expanded="true"`

```
<div class="dso-dropdown-menu dso-open">
  <button type="button" aria-haspopup="true" aria-expanded="true" class="dso-tertiary">
  <div class="dso-dropdown-options" ... > ...
</div>
```

Note: de `button` mag class `dso-primary`, `dso-secondary` of `dso-tertiary` hebben, afhankelijk van de toepassing.
