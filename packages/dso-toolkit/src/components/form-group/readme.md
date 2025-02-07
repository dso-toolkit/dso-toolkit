# `.form, form, .dso-section-body`

## `.form-group`

Een formulier bestaat uit Form Group. Elke veld/werkvorm heeft z'n eigen `.form-group`.

Als de gebruiker een ongeldige waarde invoert moet er `.dso-invalid` op `.form-group` worden geplaatst:

```html
<div class="form-group dso-*** dso-invalid">[...]</div>
```

Als het formulier daarna weer geldig wordt gemaakt moet de `.dso-invalid` class vervangen worden door `.dso-valid`:

```html
<div class="form-group dso-*** dso-valid">[...]</div>
```

### `.form-group.dso-input`

Dit is een standaard invoerveld (`<input>`). Dit veld wordt gekoppeld aan een `<label>`.

- Gebruik `type="email"` voor het automatisch valideren van een e-mailadres.
- Gebruik `type="password"` voor wachtwoorden.
- Gebruik `type="url"` voor het invoeren van URLs.
- Gebruik `type="tel"` voor het invoeren van een telefoonnummer.
- Gebruik **niet** `type="date"` maar het Web Component "Date Picker".

### `.form-group.dso-checkboxes`

Een Form Group "checkboxes" is een `fieldset` element in plaats van een `div`:

```html
<fieldset class="form-group dso-checkboxes"></fieldset>
```

### `.form-group.dso-files`

Als er geen bestanden zijn geüpload in een Form Group "files" dan wordt er geen "lege" unordered list `dso-filelist` in het formulier geplaatst.
Pas na de eerste upload is er een `ul` met 1 `li`st-item in het formulier aanwezig.
