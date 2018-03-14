module.exports = {
  "notes": "Attribuut `@rows` is optioneel\n",
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
    "id": "feedback",
    "label": "Wilt u nog wat kwijt?",
    "rows": 5
  },
  "variants": [
    {
      "name": "textarea-error",
      "context": {
        "__title": "Ongeldig",
        "__explanation": "Indien een textarea ongeldig is, dient er een 'dso-invalid' class gezet te worden op de div met de class 'dso-textarea'.",
        "id": "input-textarea-error",
        "type": "text",
        "required": true,
        "helpText": "Vul een geldige tekst in",
        "state": "invalid",
        "errorText": "Dit is geen geldige tekst"
      }
    },
    {
      "name": "textarea-error-fixed",
      "context": {
        "__title": "Geldig",
        "__explanation": "Indien een textarea ongeldig was en valide wordt gemaakt, dient de 'dso-invalid' class vervangen te worden door de class 'dso-valid'.",
        "id": "input-textarea-error-fixed",
        "type": "text",
        "required": true,
        "inputModifiers": " example-default",
        "state": "valid",
        "helpText": "Minimaal 6 tekens waarvan 1 leesteken"
      }
    },
    {
      "name": "textarea-empty",
      "context": {
        "__title": "Placeholder",
        "id": "input-textarea-empty",
        "type": "text",
        "placeholder": "Bijvoorbeeld; vragen over de toolkit",
        "required": true
      }
    }
  ]
}
