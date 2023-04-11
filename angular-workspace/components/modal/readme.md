# `<dso-modal>`

Het gebruiken van de modal in Angular kan zo:

Injecteren van `ModalController`:

```
  private modalController: DsoModalController = inject(DsoModalController);

  of

 constructor(private modalController: ModalController) {}
```

Er moet een component worden aangemaakt voor de body en optioneel ook voor de footer. Hiermee kan een modal worden geopend door:

```
this.modalController.open({
  title: 'DSO Angular Modal',
  body: ModalBodyComponent,
  footer: ModalFooterComponent,
},
{ // optionele config
  data: { // Hierin kan data worden meegegeven die nodig is voor de modal body/footer
    text: 'Ik ben data',
    count: 1,
    confirmLabel: 'akkoord',
  },
  options: { // property waardes voor: role, showCloseButton & initialFocus
    showCloseButton: true,
  },
})
```

De data in het config gedeelde hierboven kan in de `body` en `footer` componenten worden opgehaald door:

```
data = inject(DIALOG_DATA);

of

constructor(@Inject(DIALOG_DATA) public data: any) {}
```

Luisteren naar de `dsoClose` event gebeurt met:

```
this.modalRef.onDsoClose(() => this.modalRef?.close());
```

Niet meer luisteren naar `dsoClose`:

```
this.modalRef.offDsoClose();
```
