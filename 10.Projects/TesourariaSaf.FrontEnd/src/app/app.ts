import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('TesourariaSaf.FrontEnd');

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.httpClient.get("https://localhost:7138/crudbase", { headers: { "Content-Type" : "application/json" } }).subscribe((result: any) => {
      console.log(result);
    });
  }


}
