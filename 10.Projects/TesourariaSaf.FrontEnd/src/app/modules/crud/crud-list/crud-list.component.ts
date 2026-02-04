import { ChangeDetectorRef, Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { CrudBaseComponent } from "../base/crud-base.component";

@Component({
  selector: "app-crud-list",
  templateUrl: "./crud-list.component.html",
  standalone: false
})
export class CrudListComponent implements OnInit {

  //#region Fields
  public sheetId: number = 0;
  public sheetTitle: string = "";

  public crudBaseComponent: CrudBaseComponent;

  public canShow: boolean = false;
  //#endregion

  //#region Constructor
  constructor(private router: Router,
    private viewRef: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }
  //#endregion

  //#region OnInit
  public ngOnInit(): void {

  }
  //#endregion

  //#region Members
  public async initializeList(): Promise<void> {
    this.crudBaseComponent = this.viewRef.createComponent(CrudBaseComponent).instance;

    if (this.crudBaseComponent) {
      this.crudBaseComponent.sheetId = this.sheetId;
      this.crudBaseComponent.sheetTitle = this.sheetTitle;
      this.crudBaseComponent.isList = true;

      this.initializeEntities();
    }
  }

  public initializeEntities(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        this.crudBaseComponent.initialize().then(result => {
          if (result) {
            this.canShow = true;
            this.changeDetectorRef.detectChanges();
            resolve(result);
          }
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  }
  //#endregion
}
