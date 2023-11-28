import { Component } from '@angular/core';
import { doc, setDoc, collection } from "firebase/firestore";
import {Router} from "@angular/router";
import {auth, db} from "../../firebase";
import {DatePipe} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {FirestorageService} from "../api/firestorage.service";
import {FirestoreService} from "../api/firestore.service";
import {ObjectInterface} from "../entities/object.interface";
import {UserDataInterface} from "../entities/user-data.interface";
import {onAuthStateChanged} from "firebase/auth";
import firebase from "firebase/compat";
import FirestoreError = firebase.firestore.FirestoreError;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  currentDate : string | null
  urlImagen: string | ArrayBuffer = ''
  selectedImage : File | null | undefined
  isLoading = false
  userData : UserDataInterface | undefined
  reportObject : ObjectInterface

  constructor(
    private router : Router,
    datePipe : DatePipe,
    private toast : ToastrService,
    private storage : FirestorageService,
    private firestore : FirestoreService
  ) {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        this.firestore.getUserData(user.email!!).then((dataDb) => {
          if (typeof dataDb !== "undefined"){
            this.userData = dataDb as UserDataInterface
            this.reportObject.email = this.userData.email
            this.reportObject.username = `${this.userData.name} ${this.userData.lastName1} ${this.userData.lastName2}`
          } else {
            this.router.navigate(['profile']).then().catch()
            this.toast.error('Completa tu perfil para una mejor experiencia.', 'PERFIL INCOMPLETO')
          }
        })
      }
    })
    this.currentDate = datePipe.transform(new Date(), 'yyyy-MM-dd')
    this.reportObject = {
      id : '',
      email : auth.currentUser?.email!!,
      username : auth.currentUser?.displayName!!,
      phoneNumber : '',
      title : '',
      description : '',
      location : '',
      date : this.currentDate!!,
      reportType : '',
      imageUrl : ''
    }
  }
  showImage(event : Event) {
    // @ts-ignore
    if (event.target.files && event.target.files[0]) {
      let lector = new FileReader();
      // @ts-ignore
      this.selectedImage = event.target.files[0]
      lector.onload = (e) => { // @ts-ignore
        this.urlImagen = e.target.result; };
      // @ts-ignore
      lector.readAsDataURL(event.target.files[0]);
    }
  }
  removeImage() {
    this.urlImagen = ''
    this.selectedImage = null
  }
  async submitReport() {
    this.isLoading = true
    let path = (this.reportObject.reportType == 'Found') ? 'FoundObjects' : 'LostObjects'
    if (this.reportObject.reportType == '') {
      this.toast.info('Selecciona un tipo de reporte.', 'TIPO DE REPORTE')
      this.isLoading = !this.isLoading
      return
    }
    if (this.reportObject.title == '') {
      this.toast.info('Proporciona el nombre para el objeto.', 'NOMBRE DE OBJETO')
      this.isLoading = !this.isLoading
      return
    }
    if (this.reportObject.description == '') {
      this.toast.info('Proporciona una descripción para el objeto.', 'DESCRIPCIÓN DE OBJETO')
      this.isLoading = !this.isLoading
      return
    }
    if (this.reportObject.location == '') {
      this.toast.info('Proporciona la ubicación del objeto.', 'UBICACIÓN DEL OBJETO')
      this.isLoading = !this.isLoading
      return
    }

    if (this.selectedImage != null || typeof this.selectedImage !== 'undefined') {
      this.reportObject.imageUrl = await this.storage.uploadImage(path, this.selectedImage!!)
    }

    const reportRef = doc(collection(db, path))

    this.reportObject.id = reportRef.id
    this.reportObject.phoneNumber = this.userData?.phoneNumber

    await setDoc(reportRef, this.reportObject)
      .then(() => {
        this.toast.success('¡Reporte publicado con éxito!', 'REPORTE PUBLICADO')
        this.router.navigate(['home']).then().catch()
      })
      .catch((error : FirestoreError) => {
        this.toast.error(error.code, 'ERROR DE PUBLICACIÓN')
      })
      .finally(() => {
        this.isLoading = !this.isLoading
      })
  }
  goToHome() {
    this.router.navigate(['home']).then().catch()
  }
  goToProfile() {
    this.router.navigate(['profile']).then().catch()
  }
  goToMyReports() {
    this.router.navigate(['my-reports']).then().catch()
  }
  async signOut() {
    await auth.signOut().then(() => {
      this.router.navigate(['presentation']).then().catch()
    })
  }
}
