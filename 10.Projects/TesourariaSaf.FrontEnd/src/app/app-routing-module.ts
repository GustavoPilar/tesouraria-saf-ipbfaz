import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "manager", loadChildren: () => import("./modules/crud/crud.module").then(cm => cm.CrudModule), title: "Cadastros" },
  { path: "**", redirectTo: "manager", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
