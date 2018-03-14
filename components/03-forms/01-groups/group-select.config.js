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
    "id": "beleg",
    "type": "select",
    "label": "Kies uw beleg",
    "options": [
      {
        "optionType": "Vlees",
        "items": [
          {
            "value": "worst",
            "label": "Worst"
          },
          {
            "value": "salami",
            "label": "Salami"
          },
          {
            "value": "geit",
            "label": "Geit"
          }
        ]
      },
      {
        "optionType": "Vis",
        "items": [
          {
            "value": "zalm",
            "label": "Zalm"
          },
          {
            "value": "makreel",
            "label": "Makreel"
          }
        ]
      }
    ]
  },
  "variants": [
    {
      "name": "input-error",
      "context": {
        "__title": "Multiple",
        "__explanation": "Indien een multiple select gewenst is, dient er een 'dso-multiple' class gezet te worden op de div met de class 'dso-select'.",
        "id": "input-select-error",
        "type": "text",
        "multiple": true,
        "helpText": "Maak een keuze tussen vlees of vis"
      }
    },
    {
      "name": "input-error",
      "context": {
        "__title": "Ongeldig",
        "__explanation": "Indien een select ongeldig is, dient er een 'dso-invalid' class gezet te worden op de div met de class 'dso-select'.",
        "id": "input-select-error",
        "type": "text",
        "required": true,
        "helpText": "Maak een keuze tussen vlees of vis",
        "state": "invalid",
        "errorText": "Dit veld is verplicht"
      }
    },
    {
      "name": "input-select-error-fixed",
      "context": {
        "__title": "Geldig",
        "__explanation": "Indien een select ongeldig was en valide wordt gemaakt, dient de 'dso-invalid' class vervangen te worden door de class 'dso-valid'.",
        "id": "input-select-error-fixed",
        "type": "text",
        "required": true,
        "helpText": "Maak een keuze tussen vlees of vis"
      }
    }
  ]
}
