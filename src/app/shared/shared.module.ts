import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebardComponent } from './sidebard/sidebard.component';
import { HeaderComponent } from './header/header.component';
import { PrimengModule } from '../primeng.module';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebardComponent,
    HeaderComponent,
    
  ],
  exports: [
    BreadcrumbsComponent,
    SidebardComponent,
    HeaderComponent,
    PrimengModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrimengModule
  ]
})
export class SharedModule { }
