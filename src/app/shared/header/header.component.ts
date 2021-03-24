import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
 })

export class HeaderComponent implements OnInit {
    items: MenuItem[];

    constructor( private usuarioService: UsuarioService,
                 private router: Router){}

    ngOnInit() {
        this.items = [
            {
                label:'File',
                icon:'pi pi-fw pi-file',
                items:[
                    {
                        label:'New',
                        icon:'pi pi-fw pi-plus',
                        items:[
                        {
                            label:'Bookmark',
                            icon:'pi pi-fw pi-bookmark'
                        },
                        {
                            label:'Video',
                            icon:'pi pi-fw pi-video'
                        },

                        ]
                    },
                    {
                        label:'Delete',
                        icon:'pi pi-fw pi-trash'
                    },
                    {
                        separator:true
                    },
                    {
                        label:'Export',
                        icon:'pi pi-fw pi-external-link'
                    }
                ]
            },
            {
                label:'Edit',
                icon:'pi pi-fw pi-pencil',
                items:[
                    {
                        label:'Left',
                        icon:'pi pi-fw pi-align-left'
                    },
                    {
                        label:'Right',
                        icon:'pi pi-fw pi-align-right'
                    },
                    {
                        label:'Center',
                        icon:'pi pi-fw pi-align-center'
                    },
                    {
                        label:'Justify',
                        icon:'pi pi-fw pi-align-justify'
                    },

                ]
            },
            {
                label:'Usuario',
                icon:'pi pi-fw pi-user',
                items:[
                    {
                        label:'Registrar',
                        icon:'pi pi-fw pi-user-plus',
                        routerLink: './register'
                    },
                    {
                        label:'Delete',
                        icon:'pi pi-fw pi-user-minus',

                    },
                    {
                        label:'Search',
                        icon:'pi pi-fw pi-users',
                        items:[
                        {
                            label:'Filter',
                            icon:'pi pi-fw pi-filter',
                            items:[
                                {
                                    label:'Print',
                                    icon:'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon:'pi pi-fw pi-bars',
                            label:'List'
                        }
                        ]
                    }
                ]
            },
            {
                label:'Informes',
                icon:'pi pi-fw pi-calendar',
                items:[
                    {
                        label:'Gráficos',
                        icon:'pi pi-fw pi-pencil',
                        items:[
                        {
                            label:'Donas',
                            icon:'pi pi-fw pi-calendar-plus',
                            routerLink: 'grafica1'
                        },
                        {
                            label:'Barras',
                            icon:'pi pi-fw pi-calendar-minus'
                        },

                        ]
                    },
                    {
                        label:'Archieve',
                        icon:'pi pi-fw pi-calendar-times',
                        items:[
                        {
                            label:'Remove',
                            icon:'pi pi-fw pi-calendar-minus'
                        }
                        ]
                    }
                ]
            },
            {
                label:'Salir',
                icon:'pi pi-fw pi-power-off',
                command: () => {
                    this.logout();
                }
            }
        ];
    }  
    
    logout() {
        this.usuarioService.logout();
        this.router.navigateByUrl('/login');
    }

}
