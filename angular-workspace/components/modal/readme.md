# `<dso-modal>`

**Let op: het los plaatsen van `<dso-modal>` wordt sterk afgeraden. Maak gebruik van de `DsoModalController`.**

## DsoModalController

```
import { ModalContent, ModalOptions } from "dso-toolkit";
import { DsoModalController, DsoModalRef } from "@dso-toolkit/angular";

@Component()
export class ModalControllerDemo {
  private controller: DsoModalController = inject(DsoModalController);

  open() {
    const ref = this.modalController.open({
      title: 'DSO Angular Modal',
      body: ModalBodyComponent, // Angular Component. note: TemplateRef's are also allowed.
      footer: ModalFooterComponent, // Angular Component.
    },
    {
      data: {
        text: 'Dit object is beschikbaar via 'private data = inject(DIALOG_DATA)' binnen bijvoorbeeld ModalBodyComponent',
      },
    });

    ref.onDsoClose().subscribe(() => ref.close());
  }
}
```

### API

```
export type AllowedModalContentTypes = Type<unknown> | TemplateRef<unknown>;

class DsoModalController {
  open(modal: ModalContent<AllowedModalContentTypes>, options?: ModalOptions): DsoDialogRef
}

interface ModalContent<AllowedModalContentTypes> {
  title?: string;
  body: AllowedModalContentTypes;
  footer?: AllowedModalContentTypes;
}

interface ModalOptions {
  role?: "alert" | "dialog" | "alertdialog";
  showCloseButton?: boolean;
  initialFocus?: string;
}

class DialogRef {
  /** Removes the Dialog **/
  close(): void;

  onDsoClose(): EventEmitter<DsoModalCloseEvent>;
}
```

De `DsoModalRef` bevat de functie `close` om de modal te sluiten en een functie `onDsoClose` om naar het `dsoClose` event te luisteren. `modalRef.onDsoClose().subscribe(() => modalRef.close())`
