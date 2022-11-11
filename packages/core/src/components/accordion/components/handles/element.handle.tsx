import { FunctionalComponent, h } from "@stencil/core";

export const HandleElement: FunctionalComponent<{
  handleUrl: string | undefined;
  open: boolean;
  onClick: (e: MouseEvent) => void;
}> = ({ handleUrl, onClick, open }, children) => {
  if (handleUrl) {
    return (
      <a href={handleUrl} onClick={onClick} aria-expanded={open ? "true" : "false"}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-expanded={open ? "true" : "false"}>
      {children}
    </button>
  );
};
