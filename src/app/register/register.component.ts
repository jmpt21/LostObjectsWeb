import { Component } from '@angular/core';
import {UserDataInterface} from "../entities/user-data.interface";
import {FirestoreService} from "../api/firestore.service";
import firebase from "firebase/compat";
import FirestoreError = firebase.firestore.FirestoreError;
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FirebaseAuthService} from "../api/firebase-auth.service";
import AuthError = firebase.auth.AuthError;
import { updateProfile } from "firebase/auth";
import {auth} from "../../firebase";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerTitle : string = 'REGISTRO DE USUARIO'
  userData : UserDataInterface

  isLoading : boolean = false
  constructor(private firestore : FirestoreService, private authService : FirebaseAuthService, private router : Router, private toast : ToastrService) {
    this.userData = {
      name : '',
      lastName1 : '',
      lastName2 : '',
      phoneNumber : '',
      email : '',
      password : ''
    }
  }

  onSubmitUserData () {
    if (this.userData.name == '' || this.userData.lastName1 == '' || this.userData.phoneNumber == '' || this.userData.email == '' || this.userData.password == '') {
      this.toast.info('Ingresa todos los campos necesarios.', this.registerTitle)
      return
    }

    this.isLoading = true
    this.authService.createUser(this.userData.email, this.userData.password)
      .then(() => {
        updateProfile(auth.currentUser!!, {
          displayName : `${this.userData.name.trim()} ${this.userData.lastName1.trim()} ${this.userData.lastName2.trim()}`,
        }).then()
        this.firestore.createUserData(this.userData)
          .then(() => {
            this.toast.success('Registro exitoso.', this.registerTitle)
            this.goToHome()
          })
          .catch((error : FirestoreError) => {
            this.toast.error(this.setErrorMessage(error.code), this.registerTitle)
          })
      })
      .catch((error : AuthError) => {
        this.toast.error(this.setErrorMessage(error.code), this.registerTitle)
      })
      .finally(() => {
        this.isLoading = false
      })
  }

  setErrorMessage (error : string) : string {
    switch (error) {
      case 'auth/invalid-email':
        return 'Formato de correo no válido.'
      case 'auth/weak-password':
        return 'Ingrese al menos 6 carecteres en el campo de la contraseña.'
      case 'auth/email-already-in-use':
        return 'Este correo electrónico ya está registrado, ingrese un correo diferente.'
      default:
        return error
    }
  }

  goToHome() : void {
    this.router.navigate(['home']).then().catch()
  }
  /*trimData(data : UserDataInterface) : UserDataInterface {
    let dataTrim : UserDataInterface = {...data}
    for (let clave in data) {
      if (typeof dataTrim[clave] === 'string') {
        dataTrim[clave] = dataTrim[clave].trim();  // Aplica trim si el campo es una cadena
      }
    }
    return dataTrim
  }*/

  goToLogin() : void {
    this.router.navigate(['presentation']).then().catch()
  }
}
