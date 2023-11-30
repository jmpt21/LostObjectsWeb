import {Component, OnInit} from '@angular/core';
import {auth} from "../../firebase";
import {Router} from "@angular/router";
import {FirestoreService} from "../api/firestore.service";
import {ObjectInterface} from "../entities/object.interface";
import {messageObject} from "../shared/globals";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  foundObjects : Promise<ObjectInterface[]> | undefined
  lostObjects : Promise<ObjectInterface[]> | undefined

  constructor(private router : Router, private firestoreService : FirestoreService) {

  }

  ngOnInit(): void {
    /*onAuthStateChanged(auth, (user) => {
      if (user == null) {
        this.router.navigate(['presentation']).then().catch()
      }
    })*/
    this.foundObjects = this.firestoreService.getRecentObjects("FoundObjects")
    this.lostObjects = this.firestoreService.getRecentObjects("LostObjects")
  }

  async signOut() {
    await auth.signOut().then(() => {
      this.router.navigate(['presentation']).then().catch()
    })
  }

  goToMyReports() {
    this.router.navigate(['my-reports']).then().catch()
  }

  goToProfile() {
    this.router.navigate(['profile']).then().catch()
  }

  protected readonly auth = auth;
  protected readonly encodeURIComponent = encodeURIComponent;
  protected readonly messageObject = messageObject;
}
