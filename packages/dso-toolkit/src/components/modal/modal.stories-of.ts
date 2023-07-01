import { StoriesOfArguments, storiesOfFactory, componentArgs } from "../../storybook/index.js";

import { ModalArgs, modalArgsMapper, modalArgTypes } from "./modal.args.js";
import { Modal } from "./modal.models.js";

// <see #1550>
let onLeave: { load: () => void; unload: () => void } | null = null;

function onStory(load: () => void, unload: () => void) {
  onLeave = { load, unload };

  load();
}

const storyObserver = new MutationObserver(([titleMutationRecord]) => {
  if (
    !titleMutationRecord ||
    !(titleMutationRecord instanceof HTMLTitleElement) ||
    titleMutationRecord.target.textContent?.includes(" - Docs")
  ) {
    return;
  }

  if (titleMutationRecord.target.textContent?.startsWith("HTML|CSS / Modal")) {
    toggleClass("dso-modal-open");
  }

  if (titleMutationRecord.target.textContent?.startsWith("Core / Modal")) {
    setTimeout(
      () =>
        onStory(
          () => null,
          () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const modalRef = (window as any).modalRef;

            if (modalRef) {
              modalRef.close();
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              delete (window as any).modalRef;
            }
          }
        ),
      400
    );
  }

  if (titleMutationRecord.target.textContent?.startsWith("Modal")) {
    setTimeout(
      () =>
        onStory(
          () => null,
          () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const modalRef = (window as any).modalRef;

            if (modalRef.framework === "angular") {
              modalRef.ref.close();
            }

            if (modalRef.framework === "react") {
              modalRef.ref.remove();
            }
          }
        ),
      400
    );
  }

  if (onLeave) {
    onLeave.unload();

    onLeave = null;
  }
});

const canvasObserver = new MutationObserver((mutationRecords) => {
  for (const mutationRecord of mutationRecords.filter((r) => r.type === "attributes")) {
    if (!(mutationRecord.target instanceof HTMLElement)) {
      continue;
    }

    if (mutationRecord.target.hidden) {
      onLeave?.unload();
    }
  }
});

setTimeout(() => {
  const title = window.parent.document.head.querySelector("title");
  const storybookRoot = document.getElementById("storybook-root");

  if (!title || !storybookRoot) {
    console.warn("No title or storybookRoot found", title, storybookRoot);

    return;
  }

  storyObserver.observe(title, { childList: true, subtree: true });
  canvasObserver.observe(storybookRoot, { attributes: true });
}, 400);

function toggleClass(className: string) {
  setTimeout(
    () =>
      onStory(
        () => document.body.classList.add(className),
        () => document.body.classList.remove(className)
      ),
    400
  );
}
// </see #1550>

export interface ModalTemplates<TemplateFnReturnType> {
  modalTemplate: (modalProperties: Modal<TemplateFnReturnType>) => TemplateFnReturnType;
  activeBody: TemplateFnReturnType;
  activeFooter: TemplateFnReturnType;
  passiveBody: TemplateFnReturnType;
  passiveFooter: TemplateFnReturnType;
  confirmBody: TemplateFnReturnType;
  confirmFooter: TemplateFnReturnType;
  loadingBody: TemplateFnReturnType;
  datePickerBody: TemplateFnReturnType;
}

export function storiesOfModal<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ModalTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Modal", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: modalArgTypes,
    });

    stories.add(
      "confirm",
      templateMapper<ModalArgs>((args, { modalTemplate, confirmBody, confirmFooter }) =>
        modalTemplate(modalArgsMapper(args, confirmBody, confirmFooter))
      ),
      {
        args: componentArgs<Pick<ModalArgs, "role" | "modalTitle">>({
          role: "dialog",
          modalTitle: "Disclaimer",
        }),
      }
    );

    stories.add(
      "passive",
      templateMapper<ModalArgs>((args, { modalTemplate, passiveBody, passiveFooter }) =>
        modalTemplate(modalArgsMapper(args, passiveBody, passiveFooter))
      ),
      {
        args: componentArgs<Pick<ModalArgs, "role" | "modalTitle">>({
          role: "dialog",
          modalTitle: "Bestandsformaten",
        }),
      }
    );

    stories.add(
      "active",
      templateMapper<ModalArgs>((args, { modalTemplate, activeBody, activeFooter }) =>
        modalTemplate(modalArgsMapper(args, activeBody, activeFooter))
      ),
      {
        args: componentArgs<Pick<ModalArgs, "role" | "modalTitle">>({
          role: "alertdialog",
          modalTitle: "Verwijderen werkzaamheid",
        }),
      }
    );

    stories.add(
      "loading",
      templateMapper<ModalArgs>((args, { modalTemplate, loadingBody }) =>
        modalTemplate(modalArgsMapper(args, loadingBody))
      ),
      {
        args: componentArgs<Pick<ModalArgs, "role">>({
          role: "alert",
        }),
      }
    );

    stories.add(
      "with datepicker",
      templateMapper<ModalArgs>((args, { modalTemplate, datePickerBody }) =>
        modalTemplate(modalArgsMapper(args, datePickerBody))
      ),
      {
        args: componentArgs<Pick<ModalArgs, "role" | "modalTitle">>({
          role: "dialog",
          modalTitle: "Zet een datum",
        }),
      }
    );

    return stories;
  });
}
