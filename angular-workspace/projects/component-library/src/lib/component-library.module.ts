import { NgModule } from "@angular/core";

import { DIRECTIVES } from "./stencil-generated";
import { BooleanValueAccessor, RadioValueAccessor } from "./value-accessors";

const VALUE_ACCESSORS = [BooleanValueAccessor, RadioValueAccessor];

@NgModule({
  imports: [...DIRECTIVES, ...VALUE_ACCESSORS],
  exports: [...DIRECTIVES, ...VALUE_ACCESSORS],
})
export class DsoToolkitModule {}
