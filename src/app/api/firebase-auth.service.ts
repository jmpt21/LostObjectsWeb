import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword } from '@firebase/auth'
import {auth} from "../../firebase";
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor() { }

  async createUser(email : string, password : string) {
    await createUserWithEmailAndPassword(auth, email, password)
  }
}
