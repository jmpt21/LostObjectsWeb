import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {auth} from "../../firebase";
import {messageObject} from "../shared/globals";
import {ObjectInterface} from "../entities/object.interface";
import {FirestoreService} from "../api/firestore.service";
import {onAuthStateChanged} from "firebase/auth";
import {ToastrService} from "ngx-toastr";
import {FirestorageService} from "../api/firestorage.service";

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.scss']
})
export class MyReportsComponent {
  title : string = 'Reportes de objetos encontrados'
  objects : Promise<ObjectInterface[]> | undefined

  constructor(private router : Router, private firestore : FirestoreService, private storage : FirestorageService, private toast : ToastrService) {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        this.objects = this.firestore.getMyObjects('FoundObjects', auth.currentUser?.email!!)
      }
    })
  }

  async getMyFoundObjects() {
    this.title = 'Reportes de objetos encontrados'
    this.objects = this.firestore.getMyObjects('FoundObjects', auth.currentUser?.email!!)
  }
  async getMyLostObjects() {
    this.title = 'Reportes de objetos perdidos'
    this.objects = this.firestore.getMyObjects('LostObjects', auth.currentUser?.email!!)
  }
  async deleteReport(object : ObjectInterface) {
    await this.firestore.deleteObject((object.reportType == 'Found') ? 'FoundObjects' : 'LostObjects', object.id!!).then(() => {
      if (object.reportType == 'Found'){
        this.getMyFoundObjects()
      } else {
        this.getMyFoundObjects()
      }
      this.toast.success('Se marcó el objeto como devuelto.', 'OBJETO DEVUELTO')
    })
    await this.storage.deleteImage(object.imageUrl!!)
  }
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

  protected readonly messageObject = messageObject;
  protected readonly encodeURIComponent = encodeURIComponent;
}
