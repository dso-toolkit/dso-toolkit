import { EventEmitter, FunctionalComponent, h } from "@stencil/core";

import { ModalCloseEvent } from "../modal.interfaces";

export interface HeaderProps {
  modalTitle?: string;
  closable?: boolean;
  ariaId: string;
  text: (key: string) => string;
  dsoClose: EventEmitter<ModalCloseEvent>;
}

export const Header: FunctionalComponent<HeaderProps> = ({ modalTitle, closable, ariaId, text, dsoClose }) => {
  return modalTitle ? (
    <div class="dso-header">
      <h2 id={ariaId}>{modalTitle}</h2>
      {closable && (
        <dso-icon-button
          id="close-modal"
          icon="cross"
          variant="tertiary"
          label={text("close")}
          onDsoClick={(e) => dsoClose.emit({ originalEvent: e })}
        />
      )}
    </div>
  ) : (
    <span class="sr-only" id={ariaId}>
      {text("dialog")}
    </span>
  );
};
