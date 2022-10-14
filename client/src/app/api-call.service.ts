import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post<any>('http://localhost:5500/api/user/register', data);
  }

  login(data: any) {
    return this.http.post<any>('http://localhost:5500/api/user/login', data);
  }

  otherPosts(id: any) {
    return this.http.get<any>(`http://localhost:5500/api/posts/${id}`);
  }

  myPosts(id: any) {
    return this.http.get<any>(
      `http://localhost:5500/api/posts/userposts/${id}`
    );
  }

  addNewPost(data: any) {
    return this.http.post<any>('http://localhost:5500/api/posts', data);
  }

  getaPost(id: any) {
    return this.http.get<any>(`http://localhost:5500/api/posts/getpost/${id}`);
  }

  editMyPost(id: any, data: any) {
    return this.http.put<any>(
      `http://localhost:5500/api/posts/editpost/${id}`,
      { content: data }
    );
  }

  deletePost(id: any) {
    return this.http.delete<any>(
      `http://localhost:5500/api/posts/deletepost/${id}`
    );
  }

  blockedPost(id: any, userId: any) {
    return this.http.put<any>(
      `http://localhost:5500/api/posts/blockpost/${id}`,
      { userId: userId }
    );
  }

  blockedUser(id:any, userId:any){
    return this.http.put<any>(
      `http://localhost:5500/api/user/blockuser/${id}`,
      {userId }
    );
  }

  getUserProfile(id:any){
    return this.http.get<any>(`http://localhost:5500/api/user/getuser/${id}`)
  }

  updateProfile(id:any,data:any){
    return this.http.put<any>(`http://localhost:5500/api/user/updateprofile/${id}`,data)
  }

  deactivateAccount(id:any){
    return this.http.put<any>('http://localhost:5500/api/user/deactivate',{userId:id})
  }

  activateAccount(id:any){
    return this.http.put<any>('http://localhost:5500/api/user/activate',{userId:id})
  }

}
