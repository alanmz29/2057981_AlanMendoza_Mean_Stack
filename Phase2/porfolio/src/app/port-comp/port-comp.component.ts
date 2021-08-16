import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-port-comp',
  templateUrl: './port-comp.component.html',
  styleUrls: ['./port-comp.component.css']
})
export class PortCompComponent implements OnInit {
  uname:string = "";
  pwd:string = "";
  lastN:string = "";
  firstN:string = "";
  msg:string="";
  showLi:boolean=true;
  showReg:boolean=false;
  showPort:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  //Login Form
  checkUser(loginRef:NgForm){

    let login = loginRef.value;

    if(this.uname =="alanmz" && this.pwd==login.pass){
        this.showLi = false;
        this.showPort = true;
    }else {
        this.msg = "Incorrect name or password";
    }
    loginRef.reset();
  }

  toggleLogin(){
    this.showLi = !this.showLi;
    this.showReg = !this.showReg;
    this.msg="";
  }

  //Registration Form
  checkRegistration(regRef:NgForm){
    let registration = regRef.value;
    if(registration.userreg=="alanmz"){
      this.firstN = registration.fname;
      this.lastN = registration.lname;
      this.uname = registration.userreg;
      this.pwd = registration.passreg;
    }
    regRef.reset();
  }


  toggleLogin2(){
    this.showLi = !this.showLi;
    this.showPort = !this.showPort;
    this.msg="";
  }
}

