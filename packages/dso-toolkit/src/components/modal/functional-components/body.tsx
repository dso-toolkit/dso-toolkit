import { FunctionalComponent, h } from "@stencil/core";

export const Body: FunctionalComponent = () => {
  return (
    <div class="dso-body" tabIndex={0}>
      <slot name="body" />
    </div>
  );
};
