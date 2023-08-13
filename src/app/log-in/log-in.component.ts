import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  logInForm : FormGroup | any;
  constructor(private authServ : AuthService, private router : Router) { }
  ngOnInit(): void {
    this.logInForm = new FormGroup({
      username : new FormControl('',Validators.required),
      password : new FormControl('',Validators.required)
    })
  }
  formSubmit(){
    if(this.logInForm.valid){
      this.authServ.logIn(this.logInForm.value)
    }
  }
}
