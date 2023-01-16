import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { DIRECTIVES } from "./stencil-generated";

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [ReactiveFormsModule],
  exports: [...DIRECTIVES],
})
export class DsoToolkitModule {}
