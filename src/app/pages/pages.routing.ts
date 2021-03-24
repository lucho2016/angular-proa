import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { RegisterComponent } from '../auth/register/register.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          { path: '', component: DashboardComponent, data: { titulo: 'Pantalla Principal'} },
          { path: 'register', component: RegisterComponent, data: { titulo: 'Registro de Usuarios'} },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Barra de Progreso'} },
          { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica Donas'} },
         // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }, 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
