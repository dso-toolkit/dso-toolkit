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
    "id": "group_checkbox_voorbeeld",
    "label": "Check mij"
  },
  "variants": [
    {
      "name": "input-error",
      "context": {
        "__title": "Ongeldig",
        "__explanation": "Indien een checkbox groep ongeldig is, dient er een 'dso-invalid' class gezet te worden op de div met de class 'dso-checkboxes'.",
        "id": "input-checkbox-error",
        "required": true,
        "state": "invalid",
        "errorText": "Dit veld is verplicht"
      }
    },
    {
      "name": "input-error",
      "context": {
        "__title": "Geldig",
        "__explanation": "Indien een checkbox groep ongeldig was en valide wordt gemaakt, dient de 'dso-invalid' class vervangen te worden door de class 'dso-valid'.",
        "id": "input-checkbox-error",
        "required": true,
        "state": "valid"
      }
    }
  ]
}
