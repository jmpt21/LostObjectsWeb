import { Component } from '@angular/core';
import {auth} from "../../firebase";
import {Router} from "@angular/router";
import {messageObject} from "../shared/globals";
import {FirestoreService} from "../api/firestore.service";
import {ObjectInterface} from "../entities/object.interface";

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent {
  objects : Promise<ObjectInterface[]>
  title : string
  constructor(private router : Router, private firebase : FirestoreService) {
    this.objects = firebase.getAllObjects("FoundObjects")
    this.title = "Todos los objetos encontrados"
  }

  async getFoundObjects ()  {
    this.objects = this.firebase.getAllObjects("FoundObjects")
    this.title = "Todos los objetos encontrados"
  }
  async getLostObjects () {
    this.objects = this.firebase.getAllObjects("LostObjects")
    this.title = "Todos los objetos perdidos"
  }

  async signOut() {
    await auth.signOut().then(() => {
      this.router.navigate(['presentation']).then().catch()
    })
  }

  goToHome() {
    this.router.navigate(['home']).then().catch()
  }
  goToReports() {
    this.router.navigate(['report']).then().catch()
  }

  goToProfile() {
    this.router.navigate(['profile']).then().catch()
  }

  protected readonly auth = auth;
  protected readonly encodeURIComponent = encodeURIComponent;
  protected readonly messageObject = messageObject;
}
