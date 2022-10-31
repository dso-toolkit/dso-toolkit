import { SearchBar } from "../../search-bar/search-bar.models";
import { FormGroupBase } from "./form-group.base-model";

export interface FormGroupSearchBar<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "search-bar";
  searchBar: SearchBar;
}
