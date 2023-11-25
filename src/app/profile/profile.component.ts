import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {auth} from "../../firebase";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(private router : Router) { }

  goToReports() {
    this.router.navigate(['report']).then().catch()
  }
  goToHome() {
    this.router.navigate(['home']).then().catch()
  }
  async signOut () {
    await auth.signOut()
    this.router.navigate(['presentation']).then().catch()
  }
}
