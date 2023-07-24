# `<slot>`

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
