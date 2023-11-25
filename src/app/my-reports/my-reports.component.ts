import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {auth} from "../../firebase";

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.scss']
})
export class MyReportsComponent {

  constructor(private router : Router) { }
  goToHome() {
    this.router.navigate(['home']).then().catch()
  }
  goToProfile() {
    this.router.navigate(['profile']).then().catch()
  }
  async signOut() {
    await auth.signOut().then(() => {
      this.router.navigate(['presentation']).then().catch()
    })
  }
}
