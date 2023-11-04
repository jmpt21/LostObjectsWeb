import { Component } from '@angular/core';
import {auth, provider} from "../../firebase";
import { signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent {
  appLogo: string = 'assets/logos/AppLogo.png'
  googleIcon: string = 'assets/icons/GoogleIcon.png'

  googlePopupLogin(): void {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        alert(user.email)
        // ...
      }).catch((error: FirebaseError) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData?.['email'];
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }
}
