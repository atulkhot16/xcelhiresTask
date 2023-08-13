import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static apiUrl = "http://65.0.155.254:5001/test/auth/login";
  static regerateApiUrl = 'http://65.0.155.254:5001/test/auth/tokenRegenerate'
  constructor(private http : HttpClient, private router : Router) { }
  regenerateToken(){
    this.http.get(AuthService.regerateApiUrl).subscribe((res : any)=>{
      localStorage.setItem('token', res)
    });
  }
  logIn(data : any){
    const logInData = {
      username : data.username,
      password : data.password
    }
    this.http.post(AuthService.apiUrl,logInData).subscribe(
      (result : any)=>{
      localStorage.setItem('token', result.accessToken)
      if(result.status == 200){
        this.router.navigate(['/dashboard'])
      }
    },
      (err : any)=>{
        alert(err.error.msg)
      }
    )
  }
  logOut(){
    localStorage.removeItem('token')
  }
}
