module.exports = {
  "status": "wip",
  "collated": true,
  "collator": (markup, item) => (
item.context.__title || item.context.__explanation
?
  `<!-- Start: @${item.handle} -->
  <div class="dso-example-wrapper">
    <div class="dso-example-text">
      ${item.context.__title ? `<h2>${item.context.__title}</h2>` : ''}
      ${item.context.__explanation ? `<p>${item.context.__explanation}</p>` : ''}
    </div>
    <div class="dso-example">
      ${markup}
    </div>
  </div>
  <hr />
  <!-- End: @${item.handle} -->`
:
  `${markup}<hr />`),
  "context": {
    "id": "input",
    "type": "text",
    "label": "Tekstveld"
  },
  "variants": [
    {
      "name": "input-error",
      "context": {
        "__title": "Ongeldig",
        "__explanation": "Indien een input ongeldig is, dient er een 'dso-invalid' class gezet te worden op de div met de class 'dso-input'.",
        "id": "input-text-error",
        "label": "E-mailadres",
        "value": "thomas@",
        "required": true,
        "helpText": "Bijvoorbeeld: email@email.nl",
        "state": "invalid",
        "errorText": "Ongeldig e-mailadres ingevuld"
      }
    },
    {
      "name": "input-text-error-fixed",
      "context": {
        "__title": "Geldig",
        "__explanation": "Indien een input ongeldig was en valide wordt gemaakt, dient de 'dso-invalid' class vervangen te worden door de class 'dso-valid'.",
        "id": "input-text-error-fixed",
        "label": "E-mailadres",
        "value": "thomas@infoprojects.nl",
        "required": true,
        "state": "valid",
        "helpText": "Bijvoorbeeld: email@email.nl"
      }
    },
    {
      "name": "input-text-empty",
      "context": {
        "__title": "Placeholder",
        "id": "input-text-empty",
        "label": "Naam",
        "placeholder": "Voornaam Achternaam",
        "required": true
      }
    },
    {
      "name": "input-text-icon",
      "context": {
        "__title": "Met icoon",
        "id": "input-text-icon",
        "label": "Tekstveld met icoon",
        "inputIcon": "fas fa-calendar"
      }
    }
  ]
};
