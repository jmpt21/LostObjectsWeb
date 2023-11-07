import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {auth, provider} from "../../firebase";
import { signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { FirebaseError } from 'firebase/app';
import firebase from "firebase/compat";
import AuthError = firebase.auth.AuthError;
import { ToastrService } from "ngx-toastr";
import {FirestoreService} from "../api/firestore.service";
import {UserDataInterface} from "../entities/user-data.interface";

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit{
  loginEmail : string
  loginPassword : string
  errorMessageLogin : string

  isLoading : boolean = false

  constructor(private router : Router, private toast : ToastrService, private firestore : FirestoreService) {
    this.loginEmail = ''
    this.loginPassword = ''
    this.errorMessageLogin = ''
  }

  ngOnInit() {
    /*onAuthStateChanged(auth, (user) => {
      if (user != null){
        this.goToHome()
      }
    })*/
  }

  googlePopupLogin(): void {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        this.toast.success(`Sesión iniciada como: ${user.email}`, `BIENVENIDO`)
        this.goToHome()
      })
      .catch((_: FirebaseError) => {
        this.toast.error('No salga de la ventana emergente y espere a que se cierre por si sola.', 'ERROR AL INICIAR SESIÓN')
      })
  }

  emailAndPasswordLogin() : void {
    if (this.loginEmail == '' || this.loginPassword == ''){
      this.toast.info('Escriba sus credenciales de acceso.', 'INICIO DE SESIÓN')
      return
    }
    this.isLoading = true
    this.loginEmail.trim()
    signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword)
      .then(result => {
        this.toast.success(`Sesión iniciada como: ${result.user.email}`, `BIENVENIDO`)
        this.goToHome()
      })
      .catch((error : AuthError) => {
        this.toast.error(this.setErrorMessage(error.code), 'ERROR AL INICIAR SESIÓN')
      })
      .finally(() => {
        this.isLoading = false
      })
  }

  goToHome() : void {
    this.router.navigate(['home']).then().catch()
  }

  goToRegister() : void {
    this.router.navigate(['register']).then().catch()
  }

  goToForgotPassword() : void {
    this.router.navigate(['forgot-password']).then().catch()
  }

  setErrorMessage(errorCode : string) : string {
    switch (errorCode) {
      case 'auth/invalid-login-credentials':
        return 'Correo o contraseña incorrectos. Verifique sus credenciales de acceso.'
      case 'auth/invalid-email':
        return 'Formato de correo electrónico inválido.'
      default:
        return errorCode
    }
  }
}
