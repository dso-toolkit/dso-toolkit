import { Fragment, FunctionalComponent, h } from "@stencil/core";
import { clsx } from "clsx";

import { TreeView } from "./tree-view";
import { TreeViewItem, TreeViewItemIcon } from "./tree-view.interfaces";

interface TreeViewItemProps {
  owner: TreeView;
  ancestors: TreeViewItem[];
  item: TreeViewItem;
  index: number;
  level: number;
  setSize: number;
}

export const DsoTreeItem: FunctionalComponent<TreeViewItemProps> = ({
  owner,
  ancestors,
  item,
  index,
  level,
  setSize,
}) => (
  <li
    key={item.id}
    class={clsx("tree-item", { "has-child": item.hasItems, "is-expanded": !!item.open && !!item.items?.length })}
    role="none"
  >
    <div class="tree-branch-control">
      {item.hasItems ? (
        <div onClick={(e) => owner.itemClick(e, ancestors, item)}>
          <dso-icon icon={item.open ? "minus-square-outline" : "plus-square-outline"}></dso-icon>
        </div>
      ) : (
        <dso-icon></dso-icon>
      )}
    </div>
    <p
      class={clsx("tree-content", { active: item.active }, { selected: item.selected })}
      tabindex={level === 1 && index === 0 ? 0 : -1}
      role="treeitem"
      aria-expanded={item.hasItems ? "" + (!!item.open && !!item.items?.length) : undefined}
      aria-current={item.active ? "true" : undefined}
      aria-level={level}
      aria-setsize={setSize}
      aria-posinset={index + 1}
      aria-busy={item.loading ? "true" : undefined}
      data-item-id={item.id}
      onClick={(e) => owner.itemClick(e, ancestors, item)}
    >
      {item.selected && <span class="sr-only">Resultaat: </span>}
      {item.href ? (
        <a href={item.href} tabindex="-1">
          {item.label}
        </a>
      ) : (
        <span>{item.label}</span>
      )}
      {item.icons?.map((icon: TreeViewItemIcon) => (
        <dso-icon icon={icon.icon} title={icon.label}></dso-icon>
      ))}
    </p>
    {item.open && (
      <Fragment>
        {item.hasItems && !item.items && item.loading ? (
          <dso-progress-indicator size="small" label="Resultaten laden: een moment geduld alstublieft." />
        ) : (
          <ul role="group">
            {item.items?.map((childItem: TreeViewItem, childIndex: number, org: TreeViewItem[]) => (
              <DsoTreeItem
                owner={owner}
                ancestors={[...ancestors, item]}
                item={childItem}
                index={childIndex}
                level={level + 1}
                setSize={org.length}
              ></DsoTreeItem>
            ))}
          </ul>
        )}
      </Fragment>
    )}
  </li>
);
