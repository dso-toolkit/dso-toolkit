import { h, Component, ComponentInterface, Event, EventEmitter, Prop, Method } from '@stencil/core';

import { TreeViewPointerEvent, TreeViewItem } from './tree-view.interfaces';
import { DsoTreeItem } from './tree-item';

@Component({
  tag: 'dso-tree-view',
  styleUrl: './tree-view.scss',
  shadow: true
})
export class TreeView implements ComponentInterface {
  private tree?: HTMLElement;

  /**
   * The collection of TreeViewItems
   */
  @Prop()
  collection!: TreeViewItem[];

  /**
   * Emitted when a tree view item is opened.
   * The `detail` property of the `CustomEvent` will contain the complete path of TreeViewItems from the
   * root to the item that is emitting the open event. The consumer of the event is responsible for updating
   * the TreeView's collection (usually set the open state on the last TreeViewItem in path).
   */
  @Event()
  dsoOpenItem!: EventEmitter<TreeViewItem[]>;

  /**
   * Emitted when a tree view item is closed.
   * The `detail` property of the `CustomEvent` will contain the complete path of TreeViewItems from the
   * root to the item that is emitting the close event. The consumer of the event is responsible for updating
   * the TreeView's collection (usually set the closed state on the last TreeViewItem in path).
   */
  @Event()
  dsoCloseItem!: EventEmitter<TreeViewItem[]>;

  /**
   * Emitted when a tree view item is clicked.
   * The `detail` property of the `CustomEvent` will contain an object with:
   * `path` = the complete path of TreeViewItems from the root to the item that is emitting the clicked event.
   * `originalEvent` = the original click event.
   * The consumer of the event is responsible for updating the TreeView's collection (usually set the active
   * state on the last TreeViewItem in path and clear all other active item states).
   */
  @Event()
  dsoClickItem!: EventEmitter<TreeViewPointerEvent>;

  /**
   * Set focus on the last item in the specified path.
   * The consumer is responsible for providing a TreeView collection where the last item is visible.
   * @async
   * @returns Whether the item was found.
   */
  @Method()
  async focusItem(path: TreeViewItem[]): Promise<boolean> {
    const tree = this.tree;

    if (!tree || path.length === 0) {
      return false;
    }

    const itemToFocus = path[path.length - 1];

    const elementToFocus = (Array.from(tree.querySelectorAll('p') ?? []) as HTMLElement[])
      .filter(item => item.offsetWidth > 0 && item.offsetHeight > 0)
      .find(item => item.dataset['itemId'] === itemToFocus.id);

    if (!elementToFocus) {
      return false;
    }

    TreeView.setFocus(tree, elementToFocus)

    return true;
  }

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

  itemClick = (event: MouseEvent, ancestors: TreeViewItem[], item: TreeViewItem) => {
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
      this.dsoClickItem.emit({ path: [...ancestors, item], originalEvent: event });

      return;
    }

    if (item.open) {
      this.dsoCloseItem.emit([...ancestors, item]);
    }
    else {
      this.dsoOpenItem.emit([...ancestors, item]);
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
      <div id="tree" class="dso-tree" onKeyDown={(e) => this.keyDownListener(e)} ref={element => this.tree = element}>
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
