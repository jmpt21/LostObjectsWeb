import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {auth, provider} from "../../firebase";
import { signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { FirebaseError } from 'firebase/app';
import firebase from "firebase/compat";
import AuthError = firebase.auth.AuthError;
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit{
  loginEmail : string
  loginPassword : string
  errorMessageLogin : string

  constructor(private router : Router, private toast : ToastrService) {
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
      .catch((error: FirebaseError) => {
        this.toast.error(error.code, 'Error al iniciar sesión')
      })
  }

  emailAndPasswordLogin() : void {
    if (this.loginEmail == '' || this.loginPassword == ''){
      this.toast.info('Escriba sus credenciales de acceso.', 'INICIO DE SESIÓN')
      return
    }
    this.loginEmail.trim()
    signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword)
      .then(result => {
        this.toast.success(`Sesión iniciada como: ${result.user.email}`, `BIENVENIDO`)
        this.goToHome()
      })
      .catch((error : AuthError) => {
        this.toast.error(this.setErrorMessage(error.code), 'ERROR AL INICIAR SESIÓN')
      })
  }

  goToHome() : void {
    this.router.navigate(['home']).then(r => {})
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
