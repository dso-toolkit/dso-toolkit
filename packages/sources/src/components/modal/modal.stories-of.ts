import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { ModalArgs, modalArgsMapper, modalArgTypes } from "./modal.args";
import { content } from "./modal.content";
import { Modal } from "./modal.models";

// <see #1550>
let onLeave: { load: () => void; unload: () => void } | null = null;
function onStory(load: () => void, unload: () => void) {
  onLeave = { load, unload };

  load();
}

const storyObserver = new MutationObserver(([titleMutationRecord]) => {
  if (titleMutationRecord.target.textContent?.startsWith("HTML|CSS / Modal")) {
    toggleClass("dso-modal-open");
  }

  if (onLeave) {
    onLeave.unload();

    onLeave = null;
  }
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
storyObserver.observe(window.parent.document.head.querySelector("title")!, { childList: true, subtree: true });

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

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
canvasObserver.observe(document.getElementById("root")!, { attributes: true });

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
  modalTemplate: (modalProperties: Modal) => TemplateFnReturnType;
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

    const template = templateMapper<ModalArgs>((args, { modalTemplate }) => modalTemplate(modalArgsMapper(args)));

    stories.add("confirm", template, {
      args: content.confirm,
    });

    stories.add("passive", template, {
      args: content.passive,
    });

    stories.add("active", template, {
      args: content.active,
    });

    stories.add("loading", template, {
      args: content.loading,
    });
  });
}
