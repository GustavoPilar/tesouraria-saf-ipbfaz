import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { CrudListComponent } from "../crud-list.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-crud-list-manager",
  templateUrl: "./crud-list-manager.component.html",
  standalone: false
})
export class CrudListManagerComponent implements OnInit, AfterViewInit {

  //#region Fields
  @ViewChild(CrudListComponent)
  crudListComponent: CrudListComponent;
  //#endregion

  //#region Constructor
  constructor(private activatedRoute: ActivatedRoute) {

  }
  //#endregion

  //#region OnInit
  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.initCrudList();
  }
  //#endregion

  //#region Members
  public initCrudList(): void {
    let sheetId: string = this.activatedRoute.params["_value"].sheetId;
    let sheetTitle: string = this.activatedRoute.params["_value"].sheetTitle;

    if (sheetTitle && sheetId) {
      this.crudListComponent.sheetId = Number.parseInt(sheetId);
      this.crudListComponent.sheetTitle = sheetTitle;
      this.crudListComponent.initializeList();
    }
  }
  //#endregion
}
