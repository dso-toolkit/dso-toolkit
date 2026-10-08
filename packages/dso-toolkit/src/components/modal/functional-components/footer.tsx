import { FunctionalComponent, h } from "@stencil/core";

export const Footer: FunctionalComponent = () => {
  return (
    <div class="dso-footer">
      <slot name="footer" />
    </div>
  );
};
