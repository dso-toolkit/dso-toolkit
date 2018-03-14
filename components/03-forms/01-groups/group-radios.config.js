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
    "id": "radio_voorbeeld",
    "label": "Oneven getal",
    "helpText": "Kies een oneven getal",
    "options": [
      {
        "value": 1,
        "label": "een",
        "id": "optie_1"
      },
      {
        "value": 2,
        "label": "twee",
        "id": "optie_2"
      },
      {
        "value": 3,
        "label": "drie",
        "id": "optie_3"
      }
    ]
  },
  "variants": [
    {
      "name": "input-error",
      "context": {
        "__title": "Ongeldig",
        "__explanation": "Indien een radio groep ongeldig is, dient er een 'dso-invalid' class gezet te worden op de div met de class 'dso-radios'.",
        "id": "input-radio-error",
        "required": true,
        "state": "invalid",
        "errorText": "Dit veld is verplicht",
        "options": [
          {
            "value": 1,
            "label": "een",
            "id": "error_1"
          },
          {
            "value": 2,
            "label": "twee",
            "id": "error_2"
          },
          {
            "value": 3,
            "label": "drie",
            "id": "error_3"
          }
        ]
      }
    },
    {
      "name": "input-error",
      "context": {
        "__title": "Geldig",
        "__explanation": "Indien een radio groep ongeldig was en valide wordt gemaakt, dient de 'dso-invalid' class vervangen te worden door de class 'dso-valid'.",
        "id": "input-radio-error-fixed",
        "required": true,
        "state": "valid","options": [
          {
            "value": 1,
            "label": "een",
            "id": "fixed_1"
          },
          {
            "value": 2,
            "label": "twee",
            "id": "fixed_2"
          },
          {
            "value": 3,
            "label": "drie",
            "id": "fixed_3"
          }
        ]
      }
    }
  ]
}
