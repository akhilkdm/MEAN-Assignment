import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  data:any = localStorage.getItem("userInfo")
  user:any = JSON.parse(this.data);

  constructor(private router: Router) { }

  logout(){
    localStorage.removeItem("userInfo");
    this.router.navigate(["/login"])
  }

  ngOnInit(): void {
  }

}
