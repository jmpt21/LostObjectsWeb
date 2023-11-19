import {Injectable} from '@angular/core';
import {UserDataInterface} from "../entities/user-data.interface";
import {collection, doc, getDocs, orderBy, query, setDoc, limit} from "firebase/firestore";
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

}
