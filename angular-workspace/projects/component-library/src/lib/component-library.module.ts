import { NgModule } from "@angular/core";
import { ModalController } from "./controllers/modal.controller";

import { DIRECTIVES } from "./stencil-generated";

@NgModule({
  declarations: [...DIRECTIVES],
  providers: [ModalController],
  exports: [...DIRECTIVES],
})
export class DsoToolkitModule {}
