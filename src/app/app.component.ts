import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'LOST OBJECTS WEB';
  logoTecNM: string = 'assets/logos/LogoTecnm1.png'
  logoITSCH: string = 'assets/logos/LogoTecHidalgo.png'

  constructor(private toast : ToastrService, private router : Router) {

  }

  goToExplorer() {
    onAuthStateChanged(auth, (user) => {
      if (user != null){
        this.router.navigate(['explorer']).then().catch()
      } else {
        this.toast.info('Inicia sesión o registrate para poder continuar.', 'SIN SESIÓN ACTIVA')
      }
    })
  }

  goToReport() {
    onAuthStateChanged(auth, (user) => {
      if (user != null){
        this.router.navigate(['report']).then().catch()
      } else {
        this.toast.info('Inicia sesión o registrate para poder continuar.', 'SIN SESIÓN ACTIVA')
      }
    })
  }

  goToHome() {
    onAuthStateChanged(auth, (user) => {
      if (user != null){
        this.router.navigate(['home']).then().catch()
      } else {
        this.router.navigate(['presentation']).then().catch()
      }
    })
  }
}
