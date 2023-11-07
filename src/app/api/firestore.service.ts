import { Injectable } from '@angular/core';
import {UserDataInterface} from "../entities/user-data.interface";
import { doc, setDoc } from "firebase/firestore";
import {db} from "../../firebase";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor() { }

  async createUserData (userData : UserDataInterface) {
    return await setDoc(doc(db, "users", userData.email), userData)
  }
}
