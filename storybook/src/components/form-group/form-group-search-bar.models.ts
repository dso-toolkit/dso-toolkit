import { SearchBar } from "../search-bar/search-bar.models.js";

import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupSearchBar extends FormGroupBase {
  group: "search-bar";
  searchBar: SearchBar;
}
