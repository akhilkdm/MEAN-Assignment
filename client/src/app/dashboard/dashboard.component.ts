import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  postArray: any = [];
  data: any = localStorage.getItem('userInfo');
  user: any = JSON.parse(this.data);

  constructor(private getApi: ApiCallService) {}
  getOthersPost(){
    this.getApi.otherPosts(this.user.user._id).subscribe((res) => {
      this.postArray = res;
    });
  }

  blockPost(id:any){
    this.getApi.blockedPost(id,this.user.user._id).subscribe((res)=>{
      Swal.fire(res)
      this.getOthersPost();
    })
  }

  blockUser(userId:any){
    this.getApi.blockedUser(userId,this.user.user._id).subscribe((res)=>{
      Swal.fire(res);
      this.getOthersPost();
    })
  }

  ngOnInit(): void {
  this.getOthersPost();
  }
}
