import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import Swal from "sweetalert2"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  data: any = localStorage.getItem('userInfo');
  user: any = JSON.parse(this.data);
  constructor(private getApi: ApiCallService) {}
  datas: any = {
    username: "",
    email: "",
    phone: "",
    dob:"",
  };

  getUser(){
    this.getApi.getUserProfile(this.user.user._id).subscribe((res)=>{
      this.datas= res
    })
  }

  onSubmit() {
    this.getApi.updateProfile(this.user.user._id,this.datas).subscribe((res) => {
      Swal.fire(res);
    });
  }

  deactivate(){
    this.getApi.deactivateAccount(this.user.user._id).subscribe((res)=>{
      this.getUser();
      Swal.fire(res);
      
    })
  }

  activate(){
    this.getApi.activateAccount(this.user.user._id).subscribe((res)=>{
      this.getUser();
      Swal.fire(res);
      
    })
  }

  ngOnInit(): void {
    this.getUser();
  }
}
