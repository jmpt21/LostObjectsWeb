import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {auth} from "../../firebase";
import {UserDataInterface} from "../entities/user-data.interface";
import {FirestoreService} from "../api/firestore.service";
import {ToastrService} from "ngx-toastr";
import {onAuthStateChanged} from "firebase/auth";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  isLoading = false
  userData : UserDataInterface = {
    name : '',
    lastName1 : '',
    lastName2 : '',
    phoneNumber : '',
    email : ''
  }
  constructor(private router : Router, private firestore: FirestoreService, private toast : ToastrService) {
    onAuthStateChanged(auth, (user) => {
      if (user != null){
        this.firestore.getUserData(auth.currentUser?.email!!).then((doc) => {
          if (typeof doc !== "undefined"){
            this.userData = doc as UserDataInterface
          } else {
            this.toast.info('Completa la información en tu perfil para una mejor experiencia.', 'PERFIL INCOMPLETO')
          }
        })
      }

    })
  }

  submitChanges() {
    this.isLoading = true
    this.firestore.updateUserData(this.userData)
      .then(() => {
        this.toast.success('¡Información actualizada con éxito!', 'ACTUALIZACIÓN')
        this.isLoading = false
      })
      .catch(() => {
        this.isLoading = false
      })
  }

  goToMyReports() {
    this.router.navigate(['my-reports']).then().catch()
  }
  goToHome() {
    this.router.navigate(['home']).then().catch()
  }
  async signOut () {
    await auth.signOut()
    this.router.navigate(['presentation']).then().catch()
  }

}
