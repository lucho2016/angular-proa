import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

    public titulo: string;
    public tituloSubs$: Subscription;

    items: MenuItem[];
    home: MenuItem;

    constructor( private router: Router ) {
      this.tituloSubs$ = this.getArgumentosRuta()
                          .subscribe(({ titulo }) => {
                            this.titulo = titulo;
                            //document.title = titulo;
                          });
    }

    ngOnDestroy(): void {
      this.tituloSubs$.unsubscribe();
    }
      
    ngOnInit() {
        this.items = [
          {label: 'pages'},
          {label: this.titulo},
        ];
        
        this.home = {icon: 'pi pi-home'};
    }

    getArgumentosRuta() {
      return this.router.events
        .pipe(
          filter( event => event instanceof ActivationEnd ),
          filter( (event: ActivationEnd ) => event.snapshot.firstChild === null ),
          map((event: ActivationEnd) => event.snapshot.data ),
        );
    }

}
