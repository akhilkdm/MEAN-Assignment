import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(private getApi: ApiCallService, private router: Router) {}

  data = {
    email: '',
    password: '',
  };

  onSubmit() {
    this.getApi.login(this.data).subscribe(
      (res:any) => {
        localStorage.setItem("userInfo",JSON.stringify(res))
        this.router.navigate(['/dashboard']);
      },
      (err:any) => {
        Swal.fire(err.error);
      }
    );
  }

  ngOnInit(): void {}
}
