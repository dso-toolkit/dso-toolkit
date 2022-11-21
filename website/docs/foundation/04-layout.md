---
label: Lay-out
---

## Algemene pagina opbouw

### Basis

Niet-interactieve pagina's hebben de volgende structuur als basis:

```
<body>
  <div class="container">
    <header></header>
    <main>
      <h1></h1>
      <div class="row">
        <div class="col-sm-6"></div>
      </div>
    </main>
    <footer></footer>
  </div>
</body>
```

### Interactieve pagina's

Interactieve pagina's (dus, met een `<form>`) hanteren de volgende structuur:

```
<body>
  <div class="container">
    <header></header>
    <main>
      <form>
        <h1></h1>
        <h2 class="dso-steps-indicator"></h2>
        <div class="alert"></div>
        <div class="row">
          <div class="col-md-8"></div>
          <div class="col-md-4"></div>
        </div>
        <div class="dso-form-buttons"></div>
      </form>
    </main>
    <footer></footer>
  </div>
</body>
```

NB: Bovenstaand voorbeeld bevat een `.dso-steps-indicator`, een `.alert` en een `.dso-form-buttons`, maar of die onderdelen voorkomen is afhankelijk van de te realiseren applicatie. Hetzelfde geldt voor de `.row`, zoals ook verderop in dit document beschreven.

## Verticale lay-out

Voor de verticale layout en hiërarchie wordt het 8px grid gebruikt. Het 8px grid betekent het volgende: gebruik increments van 8px om de grootte van en ruimte tussen de elementen te tonen op een pagina. Dus height, width, padding, margin bestaan allemaal uit increments van 8.

## Horizontale lay-out

Voor de horizontale verdeling wordt de 12 koloms structuur van het [Bootstrap 3 grid](https://getbootstrap.com/docs/3.3/css/#grid) gebruikt. Met dit systeem kunnen onderdelen op de pagina worden gepositioneerd en kan worden geprogrammeerd wat het responsive gedrag van deze positionering is.

### Grid basis

Voor het bepalen van de positionering van pagina-onderdelen zijn de volgende classes relevant:

`.container` : in DSO applicaties staat deze direct in de `<body>` van de pagina: alle andere pagina-onderdelen bevinden zich hierin;

`.row` : wordt ingezet om een 'rij' te creëren, om onderdelen naast elkaar te positioneren en/of om het responsive gedrag van deze onderdelen te programmeren;

Elke rij bestaat uit 12 denkbeeldige kolommen, elke rij wordt gevuld van links naar rechts. Op dit stramien van 12 kolommen kunnen onderdelen worden gepositioneerd. Dit gebeurt door `<div>`s te maken met de classes `.col-xs-*`, `.col-sm-*`, `.col-md-*`, `.col-lg-*`.

Als het bijvoorbeeld de bedoeling is dat 2 onderdelen in 2/1 verhouding naast elkaar komen te staan, gebeurt dit als volgt:

```
<div class="container">
  <div class="row">
    <div class="col-sm-8">Onderdeel</div>
    <div class="col-sm-4">Onderdeel</div>
  </div>
</div>
```

NB: `.row` en `.col-*` worden alléén gebruikt voor horizontale positionering van onderdelen, en om responsive gedrag te programmeren. Plaats daarom niet elk willekeurig component in `.row` en `.col-*` als er geen responsive gedrag nodig is. Dit houdt de markup simpel en zuiver. De pagina [Aanvragen > Activiteiten]({{ '/components/detail/activiteiten' | path }}) is een goed voorbeeld wanneer `.row` en `.col-*` gebruikt moet worden om responsive gedrag te creëeren en wanneer niet. De classes `.row` en `.col-*` verzorgen niét de verticale ruimte tussen onderdelen, die volgt uit de onderdelen zelf.

## Breakpoints en viewports

Voor het responsive gedrag van de pagina en de onderdelen gelden 4 breakpoints, die de volgende viewport-classificaties opleveren:

- Extra small: 480px en kleiner;
- Small: tot 768px;
- Medium: tot 992px;
- Large: tot 1200px;
- Extra large: vanaf 1200px;

Onderstaand staan deze viewports toegelicht. Alhoewel wordt genoemd voor welk soort devices deze viewports primair bedoeld zijn, mag dat niet letterlijk genomen worden. Als een applicatie op een desktop bekeken wordt, maar bv. 400% ingezoomed, zal toch de viewport 'small'

### Extra small

Van sommige componenten (bv. een navigatiebalk, of alert) wordt de vorm aangepast als ze getoond worden in een viewport kleiner dan 480px.
Dit breakpoint kan _niet_ gebruikt worden om een alternatieve positionering te programmeren.

### Small

Primair voor mobiele telefoons. De bladspiegel (de `.container`) krijgt de volledige breedte.
Programmeren van responsive gedrag met `col-xs-*`.

### Medium

Primair voor tablets. De bladspiegel krijgt de volledige breedte.
Programmeren van responsive gedrag met `col-sm-*`.

### Large

Primair voor desktops/laptops. De bladspiegel wordt horizontaal beperkt tot maximaal 992px.
Programmeren van responsive gedrag met `col-md-*`.

### Extra large

Primair voor desktops/laptops. De bladspiegel wordt horizontaal beperkt tot maximaal 1152px.
Programmeren van responsive gedrag met `col-lg-*`.

### Voorbeeld van responsive gedrag van positionering en dimensionering

Op de homepage staat een aantal 'whiteboxes', in een `.row`. Deze onderdelen hebben als class `col-lg-2 col-md-4 col-sm-6 col-xs-12`. Dit betekent dat:

- `col-lg-2` : in de extra large viewport (vanaf het 'large' breakpoint, vandaar de `lg`) neemt dit onderdeel 2 kolommen in beslag: 2/12, er kunnen dus 6 van deze blokken naast elkaar staan.
- `col-md-4` : in de large viewport (vanaf het 'medium' breakpoint) neemt dit onderdeel 4 kolommen in beslag;
- `col-sm-6` : in de medium viewport (vanaf het 'small' breakpoint) neemt dit onderdeel 6 kolommen in beslag;
- `col-xs-12` : in de small viewport (totaan het 'small' breakpoint) neemt dit onderdeel de volledige breedte van de `.row` in beslag;
