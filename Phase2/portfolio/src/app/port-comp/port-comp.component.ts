import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';

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
  portMsg:string="";
  showLi:boolean=true;
  showReg:boolean=false;
  showPort:boolean=false;
  contacts:Array<Contact>=[];
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
      this.portMsg = "Welcome " + this.firstN+ " " + this.lastN+ "(" + this.uname + ")";
    }
    regRef.reset();
  }


  toggleLogin2(){
    this.showLi = !this.showLi;
    this.showPort = !this.showPort;
    this.msg="";
  }


  //POrtfolio form
  saveContact(portRef:NgForm,cnameRef:any,pnumRef:any){
    let c1:Contact={name:cnameRef.value, pNum:pnumRef.value};
    this.contacts.push(c1);
    
    portRef.reset();
  }
}

