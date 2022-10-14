import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private getApi: ApiCallService, private router: Router) {}

  data: any = {
    username: '',
    email: '',
    phone: '',
    password: '',
  };

  onSubmit() {
    this.getApi.register(this.data).subscribe((res) => {
      console.log(res, 'res');
      this.router.navigate(['/login']);
    });
  }
  ngOnInit(): void {}
}
