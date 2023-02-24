# `<dso-annotation-button>` & `<dso-annotation-output>`

## Instructies voor afnemers

Annotation bestaat uit twee componenten die altijd samen ingezet moeten worden. Een button en een output. Deze moeten dezelfde identifier hebben. Zie voorbeeld hieronder.

```
<dso-annotation-button identifier="id"></dso-annotation-button>
<dso-annotation-output identifier="id">
  <h2 slot="title">Annotaties</h2>
  <p>Dit is content die in de output staat</p>
</dso-annotation-output>
```

Het is ook mogelijk om in de header van de output html te plaatsen. Dit kan door middel van `slot="addons"`, zoals het voorbeeld hieronder.

```
<dso-annotation-button identifier="id"></dso-annotation-button>
<dso-annotation-output identifier="id">
  <h2 slot="title">Annotaties</h2>
  <dso-selectable slot="addons" type="checkbox" identifier="123" value=""></dso-selectable>
  <p>Dit is content die in de output staat</p>
</dso-annotation-output>
```
