import {Component, OnInit} from '@angular/core';
import {getRedirectResult, onAuthStateChanged} from "firebase/auth";
import {auth} from "../../firebase";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private router : Router, private toast : ToastrService) {

  }

  ngOnInit(): void {
    /*getRedirectResult(auth).then(result => {
      this.toast.success(`Sesión iniciada como: ${result?.user.email}`, 'BIENVENIDO')
    })

    onAuthStateChanged(auth, (user) => {

    })*/
  }


  protected readonly auth = auth;
}
