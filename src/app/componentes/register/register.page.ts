import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { ValidationService } from 'src/app/servicios/validation/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  repitePassword: string;
  telefono: string;
  genero:string;
  direccion:string;
  ciudad:string;
  codigoPostal:string;
  allet: any;
  uid:string;
  usuario={} as Usuario;

  dataArray = new Array(6);
  public controlForm;
  public nombreControles;
  public validateAllControlArray: Array<boolean>;
  public errorAllControlArray:Array<string>;
  public messageErrorActivo:boolean = false;

  constructor(
    private route: Router,
    private alert: AlertController,
    private dataAuth: AngularFireAuth,
    private authService: AuthService,
    private firestore: AngularFirestore,
    public validationService: ValidationService,
    public alertController: AlertController

  ) {

    this.controlForm = validationService.getFormGroupRegister();
    this.nombreControles = validationService.nombreControlesRegister;

  }

  ngOnInit() {}

  public validateAndRegister(){
    if(!this.comprobarCamposVacios()){
    this.validateAllControlArray = this.validationService.validateControlRegisterAll();
    this.errorAllControlArray = this.validationService.getErrorMessageRegisterAll(this.validateAllControlArray);
    this.messageErrorActivo = true;

    let bandera = true;
    for (let i = 0; i < this.validateAllControlArray.length-1 && bandera; i++) {
      if(!this.validateAllControlArray[i+1]){
        bandera = false;
      }

    }
    if(bandera){
      this.registerUser();
    }
  }else{
    this.messageErrorActivo = false;
    this.presentAlert();
  }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      subHeader: 'Error',
      message: 'Campos vacíos',
      buttons: ['OK']
    });

    await alert.present();
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
        case 2:
          this.repitePassword = this.dataArray[index]
          break;
        case 3:
          this.nombre = this.dataArray[index]
          break;
        case 4:
          this.apellidos = this.dataArray[index]
          break;
        case 5:
          this.telefono = this.dataArray[index]
          break;

        default:
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

  async registerUser() {

    this.dameTodosDatos();

    if (this.password == this.repitePassword) {
      try {
        const res = await this.dataAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        this.AllertAll('Sucessful', 'Usuario registrado');
        this.authService.login(this.email,this.password).then(res =>{
          this.route.navigate(['/home']);
        }).catch(err => alert('Error inesperado'));

        this.authService.getUserAuth().subscribe(async user => {
          this.usuario.id = user.uid
          this.usuario.email = this.email;
          this.usuario.contrasena = this.password;
          this.usuario.nombre = this.nombre;
          this.usuario.apellidos = this.apellidos;
          this.usuario.telefono = this.telefono;
          this.usuario.imagen = "data:NotFound";
          this.usuario.genero="";
          this.usuario.direccion = "";
          this.usuario.ciudad = "";
          this.usuario.codigoPostal = "";

          try {
            await this.firestore.collection("usuario").add(this.usuario).then((e =>{
              this.usuario.idRow = e.id;
              this.firestore.doc("usuario/"+e.id).update(this.usuario).then(() =>{
                console.log("Id de la coleccion concreta añadida a la row "+ this.usuario.idRow+ " despues de actualizar");

              })
            }))
          } catch (e) {
          }
        })
        console.log(res);

      } catch (error) {
        console.dir('ERROR', error.message);
      }
    }else{
      this.AllertAll("ERROR", "Las contraseñas no coinciden");
    }
  }

  async AllertAll(header: string, message: string) {
    this.allet = await this.alert.create({
      header: 'Sucessful',
      message: 'User has registered!',
      buttons: ['ok'],
    });
    await this.allet.present();
  }
}
