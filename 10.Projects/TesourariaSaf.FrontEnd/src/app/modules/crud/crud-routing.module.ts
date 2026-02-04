import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CrudComponent } from "./crud.component";
import { CrudListManagerComponent } from "./crud-list/crud-list-manager/crud-list-manager.component";

const routes: Routes = [
  { path: "", component: CrudComponent },
  { path: "list/:sheetId/:sheetTitle", component: CrudListManagerComponent },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [CommonModule, RouterModule]
})
export class CrudRoutingModule { }
