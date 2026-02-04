import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem, PrimeIcons } from "primeng/api";

@Component({
  selector: "app-menu-bar",
  templateUrl: "./menu-bar.component.html",
  standalone: false
})
export class MenuBarComponent implements OnInit {

  //#region Fields
  public menuItems: MenuItem[];
  //#endregion

  //#region
  constructor(private router: Router) {

  }
  //#endregion

  //#region OnInit()
  public ngOnInit(): void {
    this.initMenuItems();
  }
  //#endregion

  //#region Members :: InitMenuItems
  public initMenuItems(): void {
    this.menuItems = [
      {
        label: "Cadastro",
        icon: PrimeIcons.LIST,
        command: () => {
          this.navigateTo("/manager");
        }
      }
    ]
  }

  public navigateTo(target: string): void {
    this.router.navigate([target]);
  }
  //#endregion
}
