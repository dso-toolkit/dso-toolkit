import { Component, h, ComponentInterface, Prop, Event, EventEmitter } from '@stencil/core';

import { TreeViewItem } from '@dso-toolkit/sources';
import { DsoTreeItem } from './tree-item';

@Component({
  tag: 'dso-tree-view',
  styleUrl: './tree-view.scss',
  shadow: true
})
export class TreeView implements ComponentInterface {
  @Prop()
  collection!: TreeViewItem<string>[];

  @Event()
  openItem!: EventEmitter<TreeViewItem<string>[]>;

  @Event()
  closeItem!: EventEmitter<TreeViewItem<string>[]>;

  keyDownListener = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return;
    }

    const tree = event.composedPath().find(item => (item instanceof HTMLElement) ? item.id === 'tree' : false);

    if (!(event.target instanceof HTMLParagraphElement) || !(tree instanceof HTMLElement)) {
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
      case "End":
        TreeView.focusLastSibling(event.target);
        break;
      case "Home":
        TreeView.focusFirstSibling(event.target);
        break;
      case "PageDown":
        TreeView.focusPaged(event.target, 'next');
        break;
      case "PageUp":
        TreeView.focusPaged(event.target, 'previous');
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

    if (item.open) {
      this.closeItem.emit([...ancestors, item]);
    }
    else {
      this.openItem.emit([...ancestors, item]);
    }
  }

  private static focusElement(tree: HTMLElement, el: HTMLElement, direction: 'next' | 'previous'): void {
    const focusableItems = (Array.from(tree.querySelectorAll('p')) as HTMLElement[])
      .filter(item => item.tabIndex >= 0 && item.offsetWidth > 0 && item.offsetHeight > 0);

    focusableItems[focusableItems.indexOf(el) + (direction === 'next' ? 1 : -1)]?.focus();
  }

  private static focusFirstSibling(target: HTMLElement): void {
    (target.closest('ul')?.firstElementChild?.querySelector('p') as HTMLElement)?.focus();
  }

  private static focusLastSibling(target: HTMLElement): void {
    (target.closest('ul')?.lastElementChild?.querySelector('p') as HTMLElement)?.focus();
  }

  private static focusPaged(target: HTMLParagraphElement, direction: 'next' | 'previous'): void {
    const siblings = target.closest('ul')?.querySelectorAll<HTMLParagraphElement>(':scope > li > p');
    if (siblings) {
      var focusableItems = Array.from(siblings)

      if (direction === 'next') {
        focusableItems[Math.min(focusableItems.length, focusableItems.indexOf(target) + 5)]?.focus();
      }
      else {
        focusableItems[Math.max(0, focusableItems.indexOf(target) - 5)]?.focus();
      }
    }
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
