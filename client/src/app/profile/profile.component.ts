import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import Swal from 'sweetalert2';

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
    username: '',
    email: '',
    phone: '',
    dob: '',
  };
  images: any;
  PF: any;

  getUser() {
    this.getApi.getUserProfile(this.user.user._id).subscribe((res) => {
      this.datas = res;
      this.PF = `http://localhost:5500/images/${this.datas.profileImage}`;
    });
  }

  onSubmit() {
    this.getApi
      .updateProfile(this.user.user._id, this.datas)
      .subscribe((res) => {
        Swal.fire('Profile updated');
      });
  }

  deactivate() {
    this.getApi.deactivateAccount(this.user.user._id).subscribe((res) => {
      this.getUser();
      Swal.fire(res);
    });
  }

  activate() {
    this.getApi.activateAccount(this.user.user._id).subscribe((res) => {
      this.getUser();
      Swal.fire(res);
    });
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
     let file = event.target.files[0];
      this.images = file;     
    }
  }

  onUpload() {
    const formData = new FormData();
    formData.append('file', this.images);
    this.getApi.imageUpload(formData, this.user.user._id).subscribe({
      next: (res) => {
        console.log(res);
        this.getUser();
        this.images=""
      },
      error: (err) => {
        Swal.fire(err.error);
      },
    });
  }

  ngOnInit(): void {
    this.getUser();
  }
}
