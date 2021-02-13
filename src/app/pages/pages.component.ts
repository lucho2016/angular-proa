import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [`
        :host ::ng-deep button {
            margin-right: .5em;
        }
    `]
})
export class PagesComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

}
