import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ProgressBarModule } from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {PasswordModule} from 'primeng/password';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    ProgressBarModule,
    InputTextModule,
    InputNumberModule,
    MenubarModule,
    BreadcrumbModule,
    PasswordModule,
    

  ],
  exports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    ProgressBarModule,
    InputTextModule,
    InputNumberModule,
    MenubarModule,
    BreadcrumbModule,
    PasswordModule,
  ],
})
export class PrimengModule { }
