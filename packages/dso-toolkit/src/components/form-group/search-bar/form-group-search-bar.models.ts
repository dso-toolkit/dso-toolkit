import { SearchBar } from "../../search-bar";
import { FormGroupBase } from "../form-group.base-model";

export interface FormGroupSearchBar<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "search-bar";
  searchBar: SearchBar;
}
