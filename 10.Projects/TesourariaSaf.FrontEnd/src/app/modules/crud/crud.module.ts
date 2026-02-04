import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CrudRoutingModule } from "./crud-routing.module";
import { CrudComponent } from "./crud.component";
import { CrudListManagerComponent } from "./crud-list/crud-list-manager/crud-list-manager.component";
import { CrudListComponent } from "./crud-list/crud-list.component";

// PrimeNG
import { ButtonModule } from "primeng/button";
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [
    CrudComponent,
    CrudListManagerComponent,
    CrudListComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule,

    // PrimeNG
    ButtonModule,
    TableModule,
    ToolbarModule,
    TagModule
  ],
  providers: [

  ]
})
export class CrudModule { }
