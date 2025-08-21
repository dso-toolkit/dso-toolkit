import { FunctionalComponent, h } from "@stencil/core";
import { clsx } from "clsx";

import { HeaderMenuItem } from "./header.interfaces";

export interface MenuItemProps {
  item: HeaderMenuItem;
  onClick: (event: MouseEvent) => void;
  key?: string;
  ref?: (el: HTMLLIElement | undefined) => void;
}

export const MenuItem: FunctionalComponent<MenuItemProps> = ({ item, onClick, key, ref }) => {
  return (
    <li class={clsx({ "dso-active": item.active })} key={key} ref={ref}>
      <a href={item.url} aria-current={item.active ? "page" : undefined} onClick={onClick}>
        {item.label}
      </a>
    </li>
  );
};
