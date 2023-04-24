# `<dso-modal>`

**Let op: het los plaatsen van `<dso-modal>` wordt sterk afgeraden. Maak gebruik van de `DsoModalController`.**

## DsoModalController

Het gebruiken van het Modal component in Angular kan zo:

Injecteren van `ModalController`:

```
  private controller: DsoModalController = inject(DsoModalController);
```

of

```
 constructor(private controller: DsoModalController) {}
```

De controller heeft één functie `open` met 2 parameters.

- Modal
  - title: `string` \*optioneel
  - body: `Type<unknown> | TemplateRef<unknown>`
  - title: `Type<unknown> | TemplateRef<unknown>` \*optioneel
- Config \*optioneel
  - data: `any`
  - options:
    - role: `ModalRole ("alert" | "dialog" | "alertdialog")`
    - showCloseButton: `boolean`
    - initialFocus: `string`

Voorbeeld:

```
modalRef = this.modalController.open({
  title: 'DSO Angular Modal',
  body: ModalBodyComponent,
  footer: ModalFooterComponent,
},
{
  data: {
    text: 'Ik ben data',
    count: 1,
    confirmLabel: 'akkoord',
  },
  options: {
    showCloseButton: true,
  },
})
```

De data in het config gedeelde hierboven kan in de `body` en `footer` componenten worden opgehaald door:

```
data = inject(DIALOG_DATA);
```

of

```
constructor(@Inject(DIALOG_DATA) public data: any) {}
```

### DsoModalRef

De `open` functie van de controller geeft een `DsoModalRef` terug. Deze ref bevat de functie `close` om de modal te sluiten en een functie `onDsoClose` om naar het `dsoClose` event te luisteren. `modalRef.onDsoClose().subscribe()`
