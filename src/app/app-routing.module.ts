import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationComponent } from './presentation/presentation.component';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ExplorerComponent} from "./explorer/explorer.component";
import {ProfileComponent} from "./profile/profile.component";
import {ReportComponent} from "./report/report.component";

const routes: Routes = [
  { path:'', redirectTo: 'presentation', pathMatch:'full' },
  { path:'presentation', component: PresentationComponent },
  { path:'register', component: RegisterComponent },
  { path:'home', component: HomeComponent },
  { path:'forgot-password', component: ForgotPasswordComponent },
  { path:'explorer', component: ExplorerComponent },
  { path:'profile', component: ProfileComponent },
  { path:'report', component: ReportComponent },
  { path:'**', redirectTo: 'presentation', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
