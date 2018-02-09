---
context:
  colors:
    Aan de slag met de Omgevingswet:
      Grasgroen: "rgb(57,135,12)"
      Bosgroen: "rgb(39,89,55)"
      Oranje: "rgb(225,112,0)"
    Communicatiekleuren:
      Grasgroen: "#39870c"
      Grasgroen 80%: "#609f3c"
      Grasgroen 40%: "#afcf9d"
      Grasgroen 10%: "#ebf3e6"
      Bosgroen: "#275937"
      Bosgroen 80%: "#527a5e"
      Bosgroen 40%: "#a8bcaf"
      Bosgroen 10%: "#e9eeeb"
      Oranje: "#e17000"
      Zwart: "#000000"
      Grijs 80%: "#323232"
      Grijs 60%: "#666666"
---
DSO kleuren
{{#each colors }}
  <h2>{{ @key }}</h2>
  <div class="color-chips">
    {{#each this }}
      <div class="color-chip" style="border-top-color: {{ this }}">
        <strong><span class="color-chip__name">{{ @key }}</span></strong>
        <p>{{ this }}</p>
      </div>
    {{/each}}
  </div>
{{/each}}