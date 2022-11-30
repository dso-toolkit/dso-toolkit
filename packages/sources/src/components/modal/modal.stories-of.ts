import { Parameters } from "@storybook/addons";
import { componentArgs } from "../../storybook";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { ModalArgs, modalArgsMapper, modalArgTypes } from "./modal.args";
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
  modalTemplate: (modalProperties: Modal<TemplateFnReturnType>) => TemplateFnReturnType;
  activeBody: TemplateFnReturnType;
  activeFooter: TemplateFnReturnType;
  passiveBody: TemplateFnReturnType;
  passiveFooter: TemplateFnReturnType;
  confirmBody: TemplateFnReturnType;
  confirmFooter: TemplateFnReturnType;
  loadingBody: TemplateFnReturnType;
}

export function storiesOfModal<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ModalTemplates<TemplateFnReturnType>
  >,
  parameters?: Parameters
) {
  return storiesOfFactory("Modal", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: modalArgTypes,
      ...parameters,
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

    return stories;
  });
}
