import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit {
  data: any = localStorage.getItem('userInfo');
  user: any = JSON.parse(this.data);
  postArray :any= [];
  post:any="";
  newPost ={
    userId:this.user.user._id,
    username:this.user.user.username,
    content:""
  }

  constructor(private apiCall:ApiCallService) { }

  addPost(){
    this.apiCall.addNewPost(this.newPost).subscribe((res)=>{
      this.newPost.content="";
      this.getUserPost();
    })
  }

  getUserPost(){
    this.apiCall.myPosts(this.user.user._id).subscribe((res) => { 
      this.postArray = res;
      
    });
  }

  getEditPost(id:any){
    this.apiCall.getaPost(id).subscribe((res)=>{
      this.post=res;
      
    })
  }

  deletePosts(id:any){
    this.apiCall.deletePost(id).subscribe((res)=>{
      Swal.fire(res);
      this.getUserPost();
    })
  }

 
  editPost(){
    this.apiCall.editMyPost(this.post._id, this.post.content).subscribe((res)=>{
      this.getUserPost();
    })
  }

  ngOnInit(): void {
   this.getUserPost();
  }

}
