import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TESOURARIA_SAF_API_URL } from "../../core/global";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: "root"
})
export class ApiService {

  //#region Fields
  //#endregion

  //#region Constructor
  constructor(private httpClient: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {

  }
  //#endregion

  //#region Members 'Get'

  //#region getSheets()
  public async getSheetsAsync(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        this.spinnerService.show();
        let url: string = TESOURARIA_SAF_API_URL + "/crudBase/sheets";

        let headers: any = {
          "Content-Type": "application/json"
        }

        this.httpClient.get(url, { headers: headers }).subscribe((result: any) => {
          if (result) {
            this.spinnerService.hide();
            resolve(result);
          }
        })
      } catch (error) {
        console.log(error);
        this.spinnerService.hide();
        reject(error);
      }
    })
  }
  //#endregion

  //#region getSheet()
    public async getSheetByIdAsync(sheetId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        this.spinnerService.show();
        let url: string = `${TESOURARIA_SAF_API_URL}/crudbase/sheet/${sheetId}`;

        let headers: any = {
          "Content-Type": "application/json"
        }

        this.httpClient.get(url, { headers: headers }).subscribe((result: any) => {
          if (result) {
            this.spinnerService.hide();
            resolve(result);
          }
        })
      } catch (error) {
        console.log(error);
        this.spinnerService.hide();
        reject(error);
      }
    })
  }
  //#endregion

  //#endregion
}
