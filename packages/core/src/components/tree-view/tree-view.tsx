import { Component, h, ComponentInterface, Prop, Event, EventEmitter, Element, FunctionalComponent } from '@stencil/core';
import clsx from 'clsx';

import { TreeViewItem, TreeViewItemIcon } from '@dso-toolkit/sources';

interface TreeViewItemProps<T> {
  owner: TreeView;
  ancestors: TreeViewItem<T>[];
  item: TreeViewItem<T>;
  index: number;
  level: number;
  setSize: number;
}

const DsoTreeItem: FunctionalComponent<TreeViewItemProps<string>> = ({ owner, ancestors, item, index, level, setSize }) => (
  <li
    key={item.reference}
    class={clsx('tree-item', { 'has-child': item.hasItems }, { 'collapsed': !item.open })}
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
      tabindex="0"
      role="treeitem"
      aria-expanded={item.hasItems ? '' + !!item.open : undefined}
      aria-level={level}
      aria-setsize={setSize}
      aria-posinset={index + 1}
    >
      <a role="link">{item.label}</a>
      {item.icons?.map((icon: TreeViewItemIcon) =>
        <dso-icon icon={icon.icon} title={icon.label}></dso-icon>
      )}
    </p>
    <ul role="group">
      {item.hasItems && !item.items
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
  </li>
);

@Component({
  tag: 'dso-tree-view',
  styleUrl: './tree-view.scss',
  shadow: true
})
export class TreeView implements ComponentInterface {
  @Prop()
  collection!: TreeViewItem<string>[];

  @Prop()
  onFetchItems!: Function;

  @Event()
  toggleItem!: EventEmitter<TreeViewItem<string>[]>;

  @Event()
  fetchItems!: EventEmitter<TreeViewItem<string>[]>;

  @Element()
  ref: any;

  @Prop()
  updateItems = TreeView.updateDeepTree;

  keyDownListener = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return;
    }

    const tree = event.composedPath().find(item => (item instanceof HTMLElement) ? item.id === 'tree' : false);

    if (!(event.target instanceof HTMLElement) || !(tree instanceof HTMLElement)) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        TreeView.focusElement(tree, event.target, 'next');
        break;
      case "ArrowUp":
        TreeView.focusElement(tree, event.target, 'previous');
        break;
      case "ArrowRight":
        TreeView.expandElement(event.target);
        break;
      case "ArrowLeft":
        TreeView.collapseElementOrParent(tree, event.target);
        break;
      case " ":
        TreeView.toggleElement(event.target);
        break;
      default:
        return;
    }

    event.preventDefault();
  };

  itemClick = (event: Event, ancestors: TreeViewItem<string>[], item: TreeViewItem<string>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const expandableItem = event.target.closest('li');

    if (item.hasItems && !item.items) {
      expandableItem?.classList.remove('collapsed');
      this.fetchItems.emit([...ancestors, item]);
    }
    else {
      this.toggleItem.emit([...ancestors, item]);
    }
  }

  private static focusElement(tree: HTMLElement, el: HTMLElement, direction: 'next' | 'previous'): void {
    var focusableItems = (Array.from(tree.querySelectorAll('p')) as HTMLElement[])
      .filter(item => item.tabIndex >= 0 && item.offsetWidth > 0 && item.offsetHeight > 0);
    var focusableItem = focusableItems[focusableItems.indexOf(el) + (direction === 'next' ? 1 : -1)];

    focusableItem?.focus();
  }

  private static expandElement(target: HTMLElement): void {
    if (target?.getAttribute('aria-expanded') !== 'true') {
      const controlElement = target.previousElementSibling?.firstElementChild;
      if (controlElement instanceof HTMLElement) {
        controlElement.click();
      }
    }
  }

  private static collapseElementOrParent(tree: HTMLElement, target: HTMLElement): void {
    if (target?.getAttribute('aria-expanded') === 'true') {
      const controlElement = target.previousElementSibling?.firstElementChild;
      if (controlElement instanceof HTMLElement) {
        controlElement.click();
      }
    }
    else if (target?.getAttribute('aria-expanded') !== 'false') {
      const parentTarget = target?.parentElement?.parentElement?.previousElementSibling;
      if (parentTarget instanceof HTMLElement) {
        TreeView.collapseElementOrParent(tree, parentTarget);
        parentTarget.focus();
      }
    }
  }

  private static toggleElement(target: HTMLElement): void {
    const controlElement = target.previousElementSibling?.firstElementChild;
    if (controlElement instanceof HTMLElement) {
      controlElement.click();
    }
  }

  private static updateDeepTree = function(
    collection: TreeViewItem<string>[],
    path: TreeViewItem<string>[],
    updater: (item: TreeViewItem<string>) => TreeViewItem<string>
    ): TreeViewItem<string>[] {
    const item = collection.find(item => item.reference === path[0].reference);

    return collection.map(root => {
      if (root !== item) {
        return root;
      }

      if (path.length === 1) {
        return updater(item);
      }

      if (root === item) {
        return {
          ...item,
          items: item.items ? TreeView.updateDeepTree(item.items, path.slice(1), updater) : item.items
        };
      }

      throw new Error('Updating items collection encountered an error.');
    });
  }

  render() {
    return (
      <div id="tree" onKeyDown={(e) => this.keyDownListener(e)}>
        <ul role="tree" aria-label="Objectenboom">
          {this.collection?.map((item, index) =>
            <DsoTreeItem
              owner={this}
              ancestors={[]}
              item={item}
              index={index}
              level={1}
              setSize={this.collection!.length}
            ></DsoTreeItem>
          )}
        </ul>
      </div>
    );
  }
}
