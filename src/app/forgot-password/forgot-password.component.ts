import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { sendPasswordResetEmail } from "firebase/auth";
import {auth} from "../../firebase";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  emailRecovery : string = ''
  titleMessage : string = 'RECUPERACIÓN DE CONTRASEÑA'

  isLoading : boolean = false

  constructor(private router : Router, private toast : ToastrService) { }

  sendEmailToRecoveryPassword() {
    if (this.emailRecovery == '') {
      this.toast.info('Ingrese su correo electrónico para enviar el enlace de recuperación.', this.titleMessage)
      return
    }
    this.isLoading = true
    sendPasswordResetEmail(auth, this.emailRecovery)
      .then(() => {
        this.toast.success('Enlace de recuperación enviado.', this.titleMessage)
        this.router.navigate(['presentation']).then()
      })
      .catch(() => {
        this.toast.error('Ingrese un correo electrónico válido.', this.titleMessage)
      })
      .finally(() => {
        this.isLoading = false
      })
  }
}
