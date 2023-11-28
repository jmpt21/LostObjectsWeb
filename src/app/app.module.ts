import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DatePipe, NgOptimizedImage} from "@angular/common";
import { PresentationComponent } from './presentation/presentation.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { ReportComponent } from './report/report.component';
import { ProfileComponent } from './profile/profile.component';
import { MyReportsComponent } from './my-reports/my-reports.component';

@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    RegisterComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ExplorerComponent,
    ReportComponent,
    ProfileComponent,
    MyReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    })
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
