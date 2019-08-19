import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyOwnCustomMaterialModule } from './materials';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalAddComponent } from './modal-add/modal-add.component';

@NgModule({
  declarations: [AppComponent, LoginPageComponent, RegisterComponent, DashboardComponent, ModalAddComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, BrowserAnimationsModule, MyOwnCustomMaterialModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalAddComponent]
})
export class AppModule {}
