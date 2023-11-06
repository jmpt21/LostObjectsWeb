import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationComponent } from './presentation/presentation.component';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  { path:'', redirectTo: 'presentation', pathMatch:'full' },
  { path:'presentation', component: PresentationComponent },
  { path:'register', component: RegisterComponent },
  { path:'home', component: HomeComponent },
  { path:'**', redirectTo: 'presentation', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
