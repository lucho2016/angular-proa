import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PrimengModule } from './primeng.module';



@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    BrowserAnimationsModule,
    PagesModule,
    AuthModule,
 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {  }
