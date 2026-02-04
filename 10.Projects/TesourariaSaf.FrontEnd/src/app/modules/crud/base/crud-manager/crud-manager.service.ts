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

            let credit: number = valuesTemp[valuesTemp.length - 1][3]; // Total de entradas
            let debit: number = valuesTemp[valuesTemp.length - 1][4]; // Total de saídas

            for (let i = 0; i < valuesTemp.length - 1; i++) {
              let valueTemp: any = valuesTemp[i];
              let isCredit: boolean = valueTemp[3] != "";

              let newValue: any = {
                date: valueTemp[0],
                description: valueTemp[2],
                isCredit,
                value: isCredit ? valueTemp[3] : valueTemp[4]
              }

              values.push(newValue);
            }

            resolve({ values, credit, debit });
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
