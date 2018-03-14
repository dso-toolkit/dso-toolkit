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
    "label": "Kleur van object",
    "value": "Rood"
  },
  "variants": [
    {
      "name": "static",
      "context": {
        "__title": "Static",
        "__explanation": "Een static input kan gebruikt worden om statische informatie toe te voegen in een formulier"
      }
    }
  ]
};
