import { h, FunctionalComponent } from '@stencil/core';
import clsx from 'clsx';
import { TreeViewItem, TreeViewItemIcon } from '@dso-toolkit/sources';

import { TreeView } from './tree-view';

interface TreeViewItemProps<T> {
  owner: TreeView;
  ancestors: TreeViewItem<T>[];
  item: TreeViewItem<T>;
  index: number;
  level: number;
  setSize: number;
}

export const DsoTreeItem: FunctionalComponent<TreeViewItemProps<string>> = ({ owner, ancestors, item, index, level, setSize }) => (
  <li
    key={item.reference}
    class={clsx('tree-item', { 'has-child': item.hasItems })}
    role='none'
  >
    <div class="tree-branch-control">
      {item.hasItems
        ?
          <div onClick={(e) => owner.itemClick(e, ancestors, item)}>
            <dso-icon icon={item.open ? 'chevron-down' : 'chevron-right'}></dso-icon>
          </div>
        : <dso-icon></dso-icon>
      }
    </div>
    <p
      class="tree-content"
      tabindex={level === 1 && index === 0 ? 0 : -1 }
      role="treeitem"
      aria-expanded={item.hasItems ? '' + (!!item.open && !!item.items?.length) : undefined}
      aria-level={level}
      aria-setsize={setSize}
      aria-posinset={index + 1}
      aria-busy={item.loading ? 'true' : undefined}
      onClick={(e) => owner.itemClick(e, ancestors, item)}
    >
      {item.href
        ? <a href={item.href} tabindex="-1">{item.label}</a>
        : <span>{item.label}</span>
      }
      {item.icons?.map((icon: TreeViewItemIcon) =>
        <dso-icon icon={icon.icon} title={icon.label}></dso-icon>
      )}
    </p>
    {item.open &&
      <ul role="group">
        {item.hasItems && !item.items && item.loading
          ? <dso-progress-indicator size="small" label="Resultaten laden: een moment geduld alstublieft." />
          : undefined
        }
        {item.items?.map((childItem: TreeViewItem<string>, index: number, org: TreeViewItem<string>[]) =>
          <DsoTreeItem
            owner={owner}
            ancestors={[...ancestors, item]}
            item={childItem}
            index={index}
            level={level + 1}
            setSize={org.length}
          ></DsoTreeItem>
        )}
      </ul>
    }
  </li>
);
