import { Injectable } from "@angular/core";
import { CrudBaseComponent } from "../crud-base.component";
import { ApiService } from "../../../../services/api-service/api.service";

@Injectable({
  providedIn: "root"
})
export class CrudManager {

  //#region Fields
  public crudBaseComponent: CrudBaseComponent;
  public sheetTitle: string;
  public sheetId: number;
  //#endregion

  //#region Constructor
  constructor(private apiService: ApiService) {

  }
  //#endregion

  //#region Members
  public initialize(crudBaseComponent: CrudBaseComponent): void {
    this.crudBaseComponent = crudBaseComponent;

    if (this.crudBaseComponent) {
      this.sheetId = this.crudBaseComponent.sheetId;
      this.sheetTitle = this.crudBaseComponent.sheetTitle;
    }
  }

  public loadEntities(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        this.GetSheet(this.sheetId).then((result: any) => {
          if (result) {
            let valuesTemp: any[] = result.values;
            let values: any[] = [];

            let credit: string;
            let debit: string;
            let total: string;

            for (let i = 0; i < valuesTemp.length; i++) {
              let valueTemp: any = valuesTemp[i];
              if (valueTemp.length == 0) continue;

              if (valueTemp.length == 5 && valueTemp[0] == "" && valueTemp[3] != "") {
                credit = valueTemp[3];
                debit = valueTemp[4];
                continue;
              }

              if (valueTemp.length == 6 && valueTemp[5] != "") {
                total = valueTemp[5];
                continue;
              }

              let isCredit: boolean = valueTemp[3] != "";

              let newValue: any = {
                date: valueTemp[0],
                description: valueTemp[2],
                isCredit,
                value: isCredit ? valueTemp[3] : valueTemp[4]
              }

              values.push(newValue);
            }

            resolve({ values, credit, debit, total });
          }
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  }

  //#endregion

  //#region Members 'ApiService' :: GetSheet
  public async GetSheet(sheetId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        this.apiService.getSheetByIdAsync(sheetId).then((result: any) => {
          if (result) {
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
