import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { MenubarModule } from "primeng/menubar";
import { MenuBarComponent } from "./menu-bar/menu-bar.component";


@NgModule({
  declarations: [
    MenuBarComponent
  ],
  imports: [
    CommonModule,

    // PrimeNG
    MenubarModule,
    ButtonModule
  ],
  exports: [
    MenuBarComponent
  ],
  providers: [

  ]
})
export class ComponentsModule { }
