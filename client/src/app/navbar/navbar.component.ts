import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  data:any = localStorage.getItem("userInfo")
  user:any = JSON.parse(this.data);
  datas:any;
  PF:any;

  constructor(private getApi: ApiCallService,private router: Router) { }

  logout(){
    localStorage.removeItem("userInfo");
    this.router.navigate(["/login"])
  }

  getUser() {
    this.getApi.getUserProfile(this.user.user._id).subscribe((res) => {
      this.datas = res;
      console.log(this.datas);
      this.PF = `http://localhost:5500/images/${this.datas.profileImage}`;
      
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

}
