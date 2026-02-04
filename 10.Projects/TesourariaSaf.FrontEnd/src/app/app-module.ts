import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

// PrimeNG
import { providePrimeNG } from 'primeng/config';
import Aura from "@primeuix/themes/aura";
import { FilterMatchMode } from 'primeng/api';
import { ComponentsModule } from './components/components.module';

import { NgxSpinnerModule } from "ngx-spinner";
import { CrudModule } from './modules/crud/crud.module';
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Modules
    ComponentsModule,
    CrudModule,

    // Ngx-Spinner
    NgxSpinnerModule.forRoot({ type: "ball-atom" })
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false
        }
      },
      ripple: true,

      filterMatchModeOptions: {
        text: [FilterMatchMode.CONTAINS, FilterMatchMode.STARTS_WITH, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.NOT_CONTAINS],
        numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
        date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
      },
      translation: {
        accept: "Sim",
        reject: "Não",
        cancel: "Cancelar",
        dateFormat: "dd/mm/yy"
      }
    })
  ],
  bootstrap: [App]
})
export class AppModule { }
