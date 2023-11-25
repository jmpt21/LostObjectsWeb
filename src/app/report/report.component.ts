import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {auth} from "../../firebase";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  constructor(private router : Router) { }
  goToHome() {
    this.router.navigate(['home']).then().catch()
  }
  goToProfile() {
    this.router.navigate(['profile']).then().catch()
  }
  goToMyReports() {
    this.router.navigate(['my-reports']).then().catch()
  }
  async signOut() {
    await auth.signOut().then(() => {
      this.router.navigate(['presentation']).then().catch()
    })
  }
}
