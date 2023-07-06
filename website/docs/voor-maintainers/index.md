---
label: Voor de DSO Toolkit maintainer
title: Documentatie voor de maintainers
---

## `class` en Web Components

Het `class` attribuut is geen onderdeel van de Public API van ene Web Component maar moeten beschouwd worden als een onderdeel wat buiten de controle van een Web Component valt.

Gebruik in plaats daarvan attributen:

```tsx
// ❌
render() {
  return (
    <Host class="dso-fullscreen">
      <div>[...]</div>
    </Host>
  );
}

// ✅
render() {
  return (
    <Host fullscreen>
      <div>[...]</div>
    </Host>
  );
}
```

## `<slot>`

Als een Web Component met slots werkt, heeft altijd een nameless slot.

```tsx
// ❌
render() {
  return (
    <>
      <slot name="header" />
      <div class="content">
        <slot name="body" />
      </div>
    </>
  );
}

// ✅
render() {
  return (
    <>
      <slot name="header" />
      <div class="content">
        <slot />
      </div>
    </>
  );
}
```
