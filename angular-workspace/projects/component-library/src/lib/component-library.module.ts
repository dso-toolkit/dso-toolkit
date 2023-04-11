import { DialogModule } from "@angular/cdk/dialog";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { DsoModalContainer } from "./controllers/modal/modal-container.component";
import { DsoModalController } from "./controllers/modal/modal.controller";
import { DIRECTIVES } from "./stencil-generated";

@NgModule({
  declarations: [...DIRECTIVES, DsoModalContainer],
  imports: [CommonModule, DialogModule],
  providers: [DsoModalController],
  exports: [...DIRECTIVES],
})
export class DsoToolkitModule {}
