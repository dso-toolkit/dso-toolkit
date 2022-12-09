import { SearchBar } from "../../search-bar/search-bar.models.js";
import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupSearchBar<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "search-bar";
  searchBar: SearchBar;
}
