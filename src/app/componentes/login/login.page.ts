import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../servicios/auth/auth.service';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/servicios/validation/validation.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
  password:string;
  public controlForm;
  public nombreControles;
  public validateAllControlArray: Array<boolean>;
  public errorAllControlArray:Array<string>;
  public messageErrorActivo:boolean = false;
  dataArray = new Array(2);

  constructor(private authService : AuthService, public router : Router, public validationService: ValidationService) {
    this.controlForm = validationService.getFormGroupLogin();
    this.nombreControles = validationService.nombreControlesLogin;
   }

  ngOnInit() {
  }

  public validateAndLogin(){
    if(!this.comprobarCamposVacios()){
    this.validateAllControlArray = this.validationService.validateControlLoginAll();
    this.errorAllControlArray = this.validationService.getErrorMessageLoginAll(this.validateAllControlArray);
    this.messageErrorActivo = true;

    let bandera = true;
    for (let i = 0; i < this.validateAllControlArray.length-1 && bandera; i++) {
      if(!this.validateAllControlArray[i+1]){
        bandera = false;
      }

    }
    if(bandera){
      this.OnSubmitLogin();
    }
  }else{
    this.messageErrorActivo = false;
    alert("Campos vacíos")
  }
  }

  private dameTodosDatos(){
    for (let index = 0; index < this.dataArray.length; index++) {
      switch (index) {
        case 0:
          this.email = this.dataArray[index]
          break;
        case 1:
          this.password = this.dataArray[index]
          break;
      }

    }
  }

  comprobarCamposVacios(){
    for (let i = 0; i < this.dataArray.length; i++) {
      if (this.dataArray[i] === undefined || this.dataArray[i] == "") {
        return true;
      }
    }
    return false;
  }

  OnSubmitLogin(){
    this.dameTodosDatos();
    this.authService.login(this.email,this.password).then(res =>{
      this.router.navigate(['/home-cine']);
    }).catch(err => alert('Los datos son incorrectos o no existe el usuario'));
  }

  GoRegister(){
    this.router.navigate(['/register']);
  }


}
