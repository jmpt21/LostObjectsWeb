import {Component, OnInit} from '@angular/core';
import {onAuthStateChanged} from "firebase/auth";
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
    onAuthStateChanged(auth, (user) => {
      if (user == null) {
        this.router.navigate(['presentation']).then().catch()
      }
    })
  }

  protected readonly auth = auth;
}
