import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ProgressBarModule } from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    ProgressBarModule,
    InputTextModule,
    InputNumberModule

  ],
  exports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    ProgressBarModule,
    InputTextModule,
    InputNumberModule
  ],
})
export class PrimengModule { }
