import {Component, OnInit} from '@angular/core';
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../firebase";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FirestoreService} from "../api/firestore.service";
import {ObjectInterface} from "../entities/object.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  messageObject : string = 'Hola, ví la publicación de tu objeto en Lost Objects Web y tengo información al respecto.'
  foundObjects : Promise<ObjectInterface[]> | undefined
  lostObjects : Promise<ObjectInterface[]> | undefined

  constructor(private router : Router, private toast : ToastrService, private firestoreService : FirestoreService) {

  }

  ngOnInit(): void {
    onAuthStateChanged(auth, (user) => {
      if (user == null) {
        this.router.navigate(['presentation']).then().catch()
      }
    })
    this.foundObjects = this.firestoreService.getRecentObjects("FoundObjects")
    this.lostObjects = this.firestoreService.getRecentObjects("LostObjects")
  }

  setImage() {

  }

  protected readonly auth = auth;
  protected readonly encodeURIComponent = encodeURIComponent;
}
