# `<DsoModal>`

**Let op: het los plaatsen van `<DsoModal>` wordt sterk afgeraden. Maak gebruik van `<DsoModalPortal>`.**

## DsoModalPortal

`DsoModalPortal` is een wrapper component die het `DsoModal` op de juiste plek in de DOM zet.

Voorbeeld:

```
<DsoModalPortal>
  <DsoModal
    role={role}
    modalTitle={modalTitle}
    showCloseButton={showCloseButton}
    initialFocus={initialFocus}
    onDsoClose={(e: CustomEvent<DsoModalCloseEvent>) => dsoClose?.(e)}
  >
    <div slot="body">{body}</div>
    {footer && <div slot="footer">{footer}</div>}
  </DsoModal>
</DsoModalPortal>
```
