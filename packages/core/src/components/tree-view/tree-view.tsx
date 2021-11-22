import { h, Component, ComponentInterface, Event, EventEmitter, Prop } from '@stencil/core';

import { TreeViewItem } from '@dso-toolkit/sources';
import { DsoTreeItem } from './tree-item';

@Component({
  tag: 'dso-tree-view',
  styleUrl: './tree-view.scss',
  shadow: true
})
export class TreeView implements ComponentInterface {
   /**
   * The collection of TreeViewItems
   */
  @Prop()
  collection!: TreeViewItem<string>[];

  /**
   * Emitted when a tree view item is opened.
   * The `detail` property of the `CustomEvent` will contain the complete path of TreeViewItems from the
   * root to the item that is emitting the open event. The consumer of the event is responsible for updating
   * the TreeView's collection (usually set the open state on the last TreeViewItem in path).
   */
  @Event()
  openItem!: EventEmitter<TreeViewItem<string>[]>;

  /**
   * Emitted when a tree view item is closed.
   * The `detail` property of the `CustomEvent` will contain the complete path of TreeViewItems from the
   * root to the item that is emitting the close event. The consumer of the event is responsible for updating
   * the TreeView's collection (usually set the closed state on the last TreeViewItem in path).
   */
  @Event()
  closeItem!: EventEmitter<TreeViewItem<string>[]>;

  /**
   * Emitted when a tree view item is clicked.
   * The `detail` property of the `CustomEvent` will contain the complete path of TreeViewItems from the
   * root to the item that is emitting the clicked event.
   */
  @Event()
  clickItem!: EventEmitter<TreeViewItem<string>[]>;

  keyDownListener = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return;
    }

    const isIndexLetter = (str: string) => str.length === 1 && str.match(/\S/);

    const tree = event.composedPath().find(item => (item instanceof HTMLElement) ? item.className === 'dso-tree' : false);

    if (!(event.target instanceof HTMLParagraphElement) || !(tree instanceof HTMLElement)) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        TreeView.moveFocus(tree, event.target, 'next');
        break;
      case "ArrowUp":
        TreeView.moveFocus(tree, event.target, 'previous');
        break;
      case "ArrowRight":
        TreeView.expandItemOrFocusChild(tree, event.target);
        break;
      case "ArrowLeft":
        TreeView.collapseItemOrFocusParent(tree, event.target);
        break;
      case "End":
        TreeView.moveFocus(tree, event.target, 'last');
        break;
      case "Home":
        TreeView.moveFocus(tree, event.target, 'first');
        break;
      case "Enter":
      case " ":
        event.target.click();
        break;
      default:
        if (isIndexLetter(event.key)) {
          if (TreeView.setFocusByFirstCharacter(tree, event.target, event.key, event.shiftKey)) {
            break;
          }
        }

        return;
    }

    event.preventDefault();
  };

  itemClick = (event: Event, ancestors: TreeViewItem<string>[], item: TreeViewItem<string>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const contentElement = event.target.closest('.tree-content');

    if (contentElement) {
      const tree = event.composedPath().find(item => (item instanceof HTMLElement) ? item.className === 'dso-tree' : false);
      if (!(contentElement instanceof HTMLParagraphElement) || !(tree instanceof HTMLElement)) {
        return;
      }

      TreeView.setFocus(tree, contentElement);
      this.clickItem.emit([...ancestors, item]);

      return;
    }

    if (item.open) {
      this.closeItem.emit([...ancestors, item]);
    }
    else {
      this.openItem.emit([...ancestors, item]);
    }
  }

  private static setFocus(tree: HTMLElement, target: HTMLElement) {
    if (target) {
      (Array.from(tree.querySelectorAll('p')) as HTMLElement[])
        .filter(item => item.tabIndex === 0)
        .forEach(item => item.tabIndex = -1);

      target.tabIndex = 0;
      target.focus();
    }
  }

  private static moveFocus(tree: HTMLElement, el: HTMLElement, moveTo: 'first' | 'previous' | 'next' | 'last'): void {
    const focusableItems = (Array.from(tree.querySelectorAll('p')) as HTMLElement[])
      .filter(item => item.offsetWidth > 0 && item.offsetHeight > 0);

    let index = 0
    switch (moveTo) {
      case 'first':
        index = 0;
        break;
      case 'previous':
        index = focusableItems.indexOf(el) - 1;
        break;
      case 'next':
        index = focusableItems.indexOf(el) + 1;
        break;
      case 'last':
        index = focusableItems.length - 1;
        break;
    }

    TreeView.setFocus(tree, focusableItems[index]);
  }

  private static expandItemOrFocusChild(tree: HTMLElement, target: HTMLElement): void {
    if (target?.getAttribute('aria-expanded') === 'true') {
      TreeView.moveFocus(tree, target, 'next');
    }
    else {
      const controlElement = target.previousElementSibling?.firstElementChild;
      if (controlElement instanceof HTMLElement) {
        controlElement.click();
      }
    }
  }

  private static collapseItemOrFocusParent(tree: HTMLElement, target: HTMLElement): void {
    if (target?.getAttribute('aria-expanded') === 'true') {
      const controlElement = target.previousElementSibling?.firstElementChild;
      if (controlElement instanceof HTMLElement) {
        controlElement.click();
      }
    }
    else {
      const parentTarget = target?.parentElement?.parentElement?.previousElementSibling;
      if (parentTarget instanceof HTMLElement) {
        TreeView.setFocus(tree, parentTarget);
      }
    }
  }

  private static setFocusByFirstCharacter(tree: HTMLElement, el: HTMLElement, char: string, backwards: boolean): boolean {
    const focusableItems = (Array.from(tree.querySelectorAll('p')) as HTMLElement[])
      .filter(item => item.offsetWidth > 0 && item.offsetHeight > 0);

    if (backwards) {
      focusableItems.reverse();
    }

    const current = focusableItems.indexOf(el);

    char = char.toLowerCase();
    let nextItem = focusableItems.find((item, index) => index > current && item.textContent?.toLowerCase().startsWith(char));
    if (!nextItem) {
      nextItem = focusableItems.find((item, index) => index < current && item.textContent?.toLowerCase().startsWith(char));
    }

    if (nextItem) {
      TreeView.setFocus(tree, nextItem);
      return true;
    }

    return false;
  }

  render() {
    return (
      <div id="tree" class="dso-tree" onKeyDown={(e) => this.keyDownListener(e)}>
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
