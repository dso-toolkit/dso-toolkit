# `<dso-modal>`

Het gebruiken van de modal in Angular kan zo:

Injecteren van `ModalController`:

```
  private modalController: ModalController = inject(ModalController);
```

of

```
 constructor(private modalController: ModalController) {}
```

het instantieren met de controller gaat met:

```
this.instance = this.modalController.createInstance({
  title: 'Een titel',
  body: ModalBodyComponent,
  footer: ModalFooterComponent,
});

this.instance.addEventListener('dsoClose', () => this.instance.close());

```

Het openen van de modal gaat met `instance.open()`.
