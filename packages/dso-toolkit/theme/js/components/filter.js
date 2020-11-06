import $ from 'jquery';

export default class Filter {
  constructor(filterInput, filteredItems) {
    this.filterInput = filterInput;
    this.filteredItems = filteredItems;
    this.filterStore = this.filterInput.data("filter-store");
    this.clearButton = $(`#${this.filterInput.data("clear-button")}`);
    this._updateInput(localStorage.getItem(this.filterStore) || "");
    this.clearButton.on("click", () => this._updateInput(""));
    this.filterInput.on("input", (e) => this._applyFilter(e.target.value));
  }

  _updateInput(value) {
    this.filterInput.val(value);
    this._applyFilter(value);
  }

  _applyFilter(value) {
    value = value.trim();
    value ? this.clearButton.show() : this.clearButton.hide();
    localStorage.setItem(this.filterStore, value);
    this.filteredItems.map(item => item.filter(value));
  }
}
