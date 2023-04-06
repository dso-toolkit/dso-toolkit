# `<DsoModal>`

Instantieren met de controller kan op 2 manieren:
Manier 1

```
  const controller = new ModalController();

  const instance = controller.createInstance({
    title: "Een titel", // optioneel
    body: <p>Dit is een modal</p>,
    footer: <button>Bevestig</button>, // optioneel
  });
```

Manier 2:

```
  const instance = useModal({
    title: "Een titel", // optioneel
    body: <p>Dit is een modal</p>,
    footer: <button>Bevestig</button>, // optioneel
  });
```

Het `dsoClose` event listener kan worden toegevoegd op de volgende manier:

```
  instance.addEventListener("dsoClose", (e) => instance.close());
```

Het openen van de modal gaat met `instance.open()`.
