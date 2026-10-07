import { EventEmitter, FunctionalComponent, JSX, h } from "@stencil/core";

import { AnnotationActiveChangeEvent } from "./annotation.interfaces";

interface AnnotationBodyProps {
  title: JSX.Element;
  data?: JSX.Element;
  active?: boolean;
  dsoActiveChange?: EventEmitter<AnnotationActiveChangeEvent>;
  symbol?: JSX.Element;
}

export const AnnotationBody: FunctionalComponent<AnnotationBodyProps> = ({
  symbol,
  title,
  data,
  active,
  dsoActiveChange,
}) => (
  <div class="annotation-body">
    {symbol && <div class="annotation-symbol">{symbol}</div>}
    <div class="annotation-info">
      <p class="annotation-title">{title}</p>
      {data && <p class="annotation-data">{data}</p>}
    </div>
    {dsoActiveChange && (
      <div class="annotation-control">
        <dso-slide-toggle
          accessibleLabel="Toon op kaart"
          checked={active}
          onDsoActiveChange={(e) => dsoActiveChange.emit({ current: Boolean(active), next: !active, originalEvent: e })}
        />
      </div>
    )}
  </div>
);
