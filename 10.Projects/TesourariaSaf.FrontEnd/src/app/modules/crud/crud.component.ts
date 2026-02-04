import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api-service/api.service";

@Component({
  selector: "app-crud",
  templateUrl: "./crud.component.html",
  standalone: false
})
export class CrudComponent implements OnInit {

  //#region
  public sheetOptions: any[] = [];
  //#endregion

  //#region Constructor
  constructor(private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router) {

  }
  //#endregion

  //#region OnInit
  public ngOnInit(): void {
    this.initCrudOptions();
  }
  //#endregion

  //#region Members
  public initCrudOptions(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        this.apiService.getSheetsAsync().then((result: any) => {
          if (result) {
            this.sheetOptions = result.map(x => x = { sheetId: x.sheetId, sheetTitle: x.title});
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

  public navigateTo(target: any): void {
    this.router.navigate(["/manager/list/", target.sheetId, target.sheetTitle]);
  }
  //#endregion
}
