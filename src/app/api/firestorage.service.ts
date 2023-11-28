import { Injectable } from '@angular/core';
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import {storage} from "../../firebase";

import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class FirestorageService {
  constructor() { }
  async uploadImage(pathRef : string, file : File) {
    const idImage = `${pathRef}/${uuidv4()}`
    const storageRef = ref(storage, idImage)
    await uploadBytes(storageRef, file)
    return idImage
  }

  async deleteImage(pathFile : string) {
    const fileRef = ref(storage, pathFile)
    await deleteObject(fileRef)
  }
}
