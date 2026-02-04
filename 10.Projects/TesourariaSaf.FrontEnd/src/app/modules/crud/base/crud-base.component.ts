import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CrudManager } from "./crud-manager/crud-manager.service";

@Component({
  selector: "app-crud-base",
  templateUrl: "./crud-base.component.html",
  standalone: false,
  providers: [CrudManager]
})
export class CrudBaseComponent implements OnInit {

  //#region Fields
  public sheetTitle: string;
  public sheetId: number;

  public isForm: boolean = false;
  public isList: boolean = true;

  public entities: any[] = [];
  public totalCredit: string = "";
  public totalDebit: string = "";
  public total: string = "";
  //#endregion

  //#region Constructor
  constructor(public crudManager: CrudManager
  ) {

  }
  //#endregion

  //#region OnInit()
  public ngOnInit(): void {

  }
  //#endregion

  //#region Members
  public initialize(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        this.crudManager.initialize(this);

        if (this.isForm) {

        }
        else if (this.isList) {
          this.initList().then(result => {
            resolve(true);
          })
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  }

  public initList(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.crudManager.loadEntities().then((result: any) => {
        if (result) {
          this.entities = result.values;
          this.totalCredit = result.credit;
          this.totalDebit = result.debit;
          this.total = result.total;
          resolve();
        }
      }, reject);
    })
  }
  //#endregion
}
