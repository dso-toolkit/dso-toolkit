import { EventEmitter, FunctionalComponent, h } from "@stencil/core";
import { AnnotationActiveChangeEvent } from "./annotation.interfaces";

interface AnnotationBodyProps {
  title: JSX.Element;
  data?: JSX.Element;
  active: boolean | undefined;
  dsoActiveChange: EventEmitter<AnnotationActiveChangeEvent>;
}

export const AnnotationBody: FunctionalComponent<AnnotationBodyProps> = ({ title, data, active, dsoActiveChange }) => (
  <div class="annotation-body">
    <div class="annotation-symbol">
      <slot name="symbool" />
    </div>
    <div class="annotation-info">
      <p class="annotation-title">{title}</p>
      {data && <p class="annotation-data">{data}</p>}
    </div>
    <div class="annotation-control">
      <dso-slide-toggle
        checked={active}
        onDsoActiveChange={(e) => dsoActiveChange.emit({ current: Boolean(active), next: !active, originalEvent: e })}
      />
    </div>
  </div>
);
