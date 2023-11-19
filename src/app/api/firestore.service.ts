import {Injectable} from '@angular/core';
import {UserDataInterface} from "../entities/user-data.interface";
import {collection, doc, getDocs, getDoc, orderBy, query, setDoc, limit, where, deleteDoc} from "firebase/firestore";
import {getDownloadURL, ref} from "firebase/storage"
import {db, storage} from "../../firebase";
import {ObjectInterface} from "../entities/object.interface";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor() { }

  async createUserData(userData : UserDataInterface) {
    return await setDoc(doc(db, "users", userData.email), userData)
  }

  async getUserData(email : string) {
    let data = await getDoc(doc(db, "users", email))
    if (data.exists()) {
      return data
    } else {
      return "unavailable"
    }
  }

  async updateUserData(updatedData : UserDataInterface) {
    return await setDoc(doc(db, "users", updatedData.email), updatedData)
  }

  async getRecentObjects(path : string) {
    let objects : ObjectInterface[] = []
    let querySnapshot = await getDocs(query(collection(db, path), orderBy("date", "desc"), limit(6)))
    querySnapshot.forEach( (doc) => {
      /*let obj = doc.data()
      const starsRef = ref(storage, `${obj['imageUrl']}`);
      getDownloadURL(starsRef).then((url) => {
        obj['imageUrl'] = url
        objects.push(obj)
      })*/
      objects.push(doc.data())
    })
    for (const item of objects) {
      let starsRef
      if (item['imageUrl'] == null || item['imageUrl'] == "") {
        item.imageUrl = 'assets/icons/default_object.png'
      } else {
        starsRef = ref(storage, `${item['imageUrl']}`)
        item.imageUrl = await getDownloadURL(starsRef)
      }
    }
    return objects
  }

  async getAllObjects(path : string) {
    let allObjects : ObjectInterface[] = []
    let querySnapshot = await getDocs(query(collection(db, path), orderBy("date","desc")))
    querySnapshot.forEach((doc) => {
      allObjects.push(doc.data())
    })
    for (const object of allObjects) {
      let starsRef
      if (object['imageUrl'] == null || object['imageUrl'] == "") {
        object.imageUrl = 'assets/icons/default_object.png'
      } else {
        starsRef = ref(storage, `${object['imageUrl']}`)
        object.imageUrl = await getDownloadURL(starsRef)
      }
    }
    return allObjects
  }

  async getMyObjects(path : string, userEmail: string) {
    let myObjects : ObjectInterface[] = []
    let querySnapshot = await getDocs(
        query(
          collection(db, path),
          where("email", "==", userEmail),
          orderBy("date", "desc"))
    )
    querySnapshot.forEach((doc) => {
      myObjects.push(doc.data())
    })
    for (const object of myObjects) {
      let starsRef
      if (object['imageUrl'] == null || object['imageUrl'] == "") {
        object.imageUrl = 'assets/icons/default_object.png'
      } else {
        starsRef = ref(storage, `${object['imageUrl']}`)
        object.imageUrl = await getDownloadURL(starsRef)
      }
    }
    return myObjects
  }

  async deleteObject(path: string, id: string) {
    await deleteDoc(doc(db, path, id))
  }
}
