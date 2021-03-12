import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { MyFormControl } from 'src/app/validators/myFormControl';
import { MyFormGroup } from 'src/app/validators/myformgroup';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {


  getFormGroupLogin():any{
    return this.myLoginFormGroup.formGroup;
   }
  getFormGroupEditPerfil():any{
    return this.myEditPerfilFormGroup.formGroup;
   }

   getFormGroupRegister():any{
    return this.myRegisterFormGroup.formGroup;
   }
   private myRegisterFormGroup: MyFormGroup;
   private myLoginFormGroup: MyFormGroup;
   private myEditPerfilFormGroup: MyFormGroup;

   public nombreControlesRegister = ['Email', 'Password', 'Repite Password', 'Nombre','Apellidos','Telefono'];
   public nombreControlesLogin = ['Email', 'Password'];
   public nombreControlesEditPerfil = ['Email', 'Password','Repite Password', 'Nombre','Apellidos','Telefono','Direccion','Ciudad','Codigo Postal'];

   private controlerRegister = [
     new MyFormControl('',Validators.pattern('^[(a-zA-Z-0-9-\\_\\+\\.)]+@[(a-z-A-z)]+\\.[(a-zA-z)]{2,3}$')),
     new MyFormControl('',Validators.pattern('[0-9]{6}')),
     new MyFormControl('',Validators.pattern('[0-9]{6}')),
     new MyFormControl('',Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚªº\\s]*$')),
     new MyFormControl('',Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚªº\\s]*$')),
     new MyFormControl('',Validators.pattern('[6|7][0-9]{8}$')),

   ]
   private controlerLogin = [
     new MyFormControl('',Validators.pattern('^[(a-zA-Z-0-9-\\_\\+\\.)]+@[(a-z-A-z)]+\\.[(a-zA-z)]{2,3}$')),
     new MyFormControl('',Validators.pattern('[0-9]{6}')),

   ]

   private controlerEditPerfil = [
    new MyFormControl('',Validators.pattern('^[(a-zA-Z-0-9-\\_\\+\\.)]+@[(a-z-A-z)]+\\.[(a-zA-z)]{2,3}$')),
    new MyFormControl('',Validators.pattern('[0-9]{6}')),
    new MyFormControl('',Validators.pattern('[0-9]{6}')),
    new MyFormControl('',Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚªº\\s]*$')),
    new MyFormControl('',Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚªº\\s]*$')),
    new MyFormControl('',Validators.pattern('[6|7][0-9]{8}$')),
    new MyFormControl('',Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚªº\\s]*$')),
    new MyFormControl('',Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚªº\\s]*$')),
    new MyFormControl('',Validators.pattern('[0-9]{5}$')),


  ]

   constructor() {

     this.createAllRegister();
     this.createAllLogin();
     this.createAllEditPerfil();

   }

   createAllLogin(){
    this.myLoginFormGroup = new MyFormGroup(this.nombreControlesLogin,this.controlerLogin);
    this.myLoginFormGroup.insertarValidationMessages('Email',['pattern'],['Introduzca un email correcto']);
    this.myLoginFormGroup.insertarValidationMessages('Password',['pattern'],['La contraseña no es correcta']);
   }
   createAllRegister(){
    this.myRegisterFormGroup = new MyFormGroup(this.nombreControlesRegister,this.controlerRegister);
     this.myRegisterFormGroup.insertarValidationMessages('Email',['pattern'],['Introduzca un email correcto']);
     this.myRegisterFormGroup.insertarValidationMessages('Password',['pattern'],['La contraseña no es correcta']);
     this.myRegisterFormGroup.insertarValidationMessages('Repite Password',['pattern'],['La contraseña no es correcta']);
     this.myRegisterFormGroup.insertarValidationMessages('Nombre',['pattern'],['El nombre no es correcto']);
     this.myRegisterFormGroup.insertarValidationMessages('Apellidos',['pattern'],['Los apellidos no son correctos']);
     this.myRegisterFormGroup.insertarValidationMessages('Telefono',['pattern'],['El teléfono no es correcto']);
   }

   createAllEditPerfil(){
    this.myEditPerfilFormGroup = new MyFormGroup(this.nombreControlesEditPerfil,this.controlerEditPerfil);
     this.myEditPerfilFormGroup.insertarValidationMessages('Email',['pattern'],['Introduzca un email correcto']);
     this.myEditPerfilFormGroup.insertarValidationMessages('Password',['pattern'],['La contraseña no es correcta']);
     this.myEditPerfilFormGroup.insertarValidationMessages('Repite Password',['pattern'],['La contraseña no es correcta']);
     this.myEditPerfilFormGroup.insertarValidationMessages('Nombre',['pattern'],['El nombre no es correcto']);
     this.myEditPerfilFormGroup.insertarValidationMessages('Apellidos',['pattern'],['Los apellidos no son correctos']);
     this.myEditPerfilFormGroup.insertarValidationMessages('Telefono',['pattern'],['El teléfono no es correcto']);
     this.myEditPerfilFormGroup.insertarValidationMessages('Direccion',['pattern'],['La dirección no es correcta']);
     this.myEditPerfilFormGroup.insertarValidationMessages('Ciudad',['pattern'],['La ciudad no es correcta']);
     this.myEditPerfilFormGroup.insertarValidationMessages('Codigo Postal',['pattern'],['El código postal no es correcto']);

   }



  validateControlRegisterAll():Array<boolean>{
    let validateAllControlArray: Array<boolean> = new Array(this.nombreControlesRegister.length);
    let i = 0;
    this.nombreControlesRegister.forEach(e=>{
      i++;
      if(this.myRegisterFormGroup.getControl(e).dirty &&
      !this.myRegisterFormGroup.getControl(e).valid ||
      (this.myRegisterFormGroup.getControl(e).value === undefined)){
        validateAllControlArray[i] = false;
      }else{
        validateAllControlArray[i] = true;
      }
    })
    return validateAllControlArray;
  }

  validateControlLoginAll():Array<boolean>{
    let validateAllControlArray: Array<boolean> = new Array(this.nombreControlesLogin.length);
    let i = 0;
    this.nombreControlesLogin.forEach(e=>{
      i++;
      if(this.myLoginFormGroup.getControl(e).dirty &&
      !this.myLoginFormGroup.getControl(e).valid ||
      (this.myLoginFormGroup.getControl(e).value === undefined)){
        validateAllControlArray[i] = false;
      }else{
        validateAllControlArray[i] = true;
      }
    })
    return validateAllControlArray;
  }
  validateControlEditPerfilAll():Array<boolean>{
    let validateAllControlArray: Array<boolean> = new Array(this.nombreControlesEditPerfil.length);
    let i = 0;
    this.nombreControlesEditPerfil.forEach(e=>{
      i++;
      if(this.myEditPerfilFormGroup.getControl(e).dirty &&
      !this.myEditPerfilFormGroup.getControl(e).valid ||
      (this.myEditPerfilFormGroup.getControl(e).value === undefined)){
        validateAllControlArray[i] = false;
      }else{
        validateAllControlArray[i] = true;
      }
    })
    return validateAllControlArray;
  }

    getErrorMessageRegisterAll(array: Array<boolean>): Array<string>{
      let errorAllControlArray: Array<string> = new Array(this.nombreControlesRegister.length);

      for (let i = 0; i < array.length-1; i++) {
        if(array[i+1]){
          errorAllControlArray[i]= "Sin error"
        }else{
          let algo = this.myRegisterFormGroup.getControl(this.nombreControlesRegister[i])
          let error = algo.errors
          errorAllControlArray[i]= algo.getValidationMessage(Object.keys(error)[0]);
        }
      }

      return errorAllControlArray;
    }

    getErrorMessageLoginAll(array: Array<boolean>): Array<string>{
      let errorAllControlArray: Array<string> = new Array(this.nombreControlesLogin.length);

      for (let i = 0; i < array.length-1; i++) {
        if(array[i+1]){
          errorAllControlArray[i]= "Sin error"
        }else{
          let algo = this.myLoginFormGroup.getControl(this.nombreControlesLogin[i])
          let error = algo.errors
          errorAllControlArray[i]= algo.getValidationMessage(Object.keys(error)[0]);
        }
      }

      return errorAllControlArray;
    }

    getErrorMessageEditPerfilAll(array: Array<boolean>): Array<string>{
      let errorAllControlArray: Array<string> = new Array(this.nombreControlesEditPerfil.length);

      for (let i = 0; i < array.length-1; i++) {
        if(array[i+1]){
          errorAllControlArray[i]= "Sin error"
        }else{
          let algo = this.myEditPerfilFormGroup.getControl(this.nombreControlesEditPerfil[i])
          let error = algo.errors
          errorAllControlArray[i]= algo.getValidationMessage(Object.keys(error)[0]);
        }
      }

      return errorAllControlArray;
    }
}
