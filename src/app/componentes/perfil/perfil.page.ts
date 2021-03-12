import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActionSheetController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { AccessGaleryService } from 'src/app/servicios/accessGalery/access-galery.service';
import { AuthService } from 'src/app/servicios/auth/auth.service';

import * as firebase from 'firebase';
import { ValidationService } from 'src/app/servicios/validation/validation.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public usuario = {} as Usuario;
  nuevaContrasena: string;
  allet: any;
  public image: any;
  btnImagen:boolean = false;
  data:any;

  dataArray = new Array(9);
  public controlForm;
  public nombreControles;
  public validateAllControlArray: Array<boolean>;
  public errorAllControlArray:Array<string>;
  public messageErrorActivo:boolean = false;

  @ViewChild('imageCanvas', { static: false }) canvas: any;
  private ctx: CanvasRenderingContext2D;
  private canvasPosition: DOMRect;
  private canvasElement: any;
  private background = new Image();

  private imgHeight;
  private imageResize = new Image();


  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private alert: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private galery: AccessGaleryService,
    private plt: Platform,
    private loadingCtrl: LoadingController,
    private validationService: ValidationService

  ) {
    this.controlForm = validationService.getFormGroupEditPerfil();
    this.nombreControles = validationService.nombreControlesEditPerfil;
    this.usuario.genero="  ";
    this.usuario.direccion="  ";
    this.usuario.ciudad="  ";
    this.usuario.codigoPostal="  ";

  }

  async ionViewWillEnter() {
    // this.dameTodosDatosDos();
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();
    this.usuario = await this.authService.getDatosUsuario(loader)
  }


  public validateAndEditPerfil(){
    if(!this.comprobarCamposVacios()){
    this.validateAllControlArray = this.validationService.validateControlEditPerfilAll();
    this.errorAllControlArray = this.validationService.getErrorMessageEditPerfilAll(this.validateAllControlArray);
    this.messageErrorActivo = true;

    let bandera = true;
    for (let i = 0; i < this.validateAllControlArray.length-1 && bandera; i++) {
      if(!this.validateAllControlArray[i+1]){
        bandera = false;
      }

    }
    if(bandera){
      this.editPerfile();
    }
  }else{
    this.messageErrorActivo = false;
    this.presentAlert();
  }
  }
  async presentAlert() {
    const alert = await this.alert.create({
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
          this.usuario.email = this.dataArray[index]
          break;
        case 1:
          this.usuario.contrasena = this.dataArray[index]
          break;
        case 2:
          this.nuevaContrasena = this.dataArray[index]
          break;
        case 3:
          this.usuario.nombre = this.dataArray[index]
          break;
        case 4:
          this.usuario.apellidos = this.dataArray[index]
          break;
        case 5:
          this.usuario.telefono = this.dataArray[index]
          break;
        case 6:
          this.usuario.direccion = this.dataArray[index]
          break;
        case 7:
          this.usuario.ciudad = this.dataArray[index]
          break;
        case 8:
          this.usuario.codigoPostal = this.dataArray[index]
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

  async actualizarAvatar(){
    await this.authService.getUserAuth().subscribe(async (user) =>{
      this.usuario.imagen = this.canvasElement.toDataURL();
      console.log(this.usuario.imagen);

      this.firestore.doc("usuario/"+this.usuario.idRow).update(this.usuario)
      firebase.default.storage().ref().child('avataresImg').child(this.usuario.idRow).child('img').putString(this.usuario.imagen, 'data_url');

    })
    location.reload()
  }

  public async presentActionSheet() {
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      cssClass: 'headerActionSheet',
      buttons: [
        {
          text: 'Load from Library',
          icon: 'share',
          cssClass: 'galery',
          handler: () => {
            this.getGalery()
          }
        },
        {
          text: 'Use Camera',
          icon: 'camera',
          cssClass: 'camera',

          handler: () => {
            this.openCam()
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          cssClass: 'cancelSheet'
        }
      ]
    });
    actionSheet.present();
  }

  private getGalery() {
    console.log("canvas element width: " +this.canvasElement.width );
    console.log("canvas element height: " +this.plt.height() * 0.20 );

    this.galery.openGalery().then((data: string) => {
      console.log("ENTRO EN THEN op");
      console.log(data);

      this.ctx.clearRect(0, 0, this.canvasElement.width, this.plt.height() - (this.plt.height() * 0.20));
      this.image = data;
      this.setBackground();
      // this.options();
    });

  }

  private openCam() {
    this.galery.openCamera().then((data: string) => {
      this.ctx.clearRect(0, 0, this.canvasElement.width, this.plt.height() - (this.plt.height() * 0.20));
      this.image = data;
      this.setBackground();
      // this.options();
    });
  }

  private setBackground() {
    this.background.src = this.image;
    this.background.onload = () => {
      this.resizeCanvasImage(this.background);
    }
  }

  private settings = {
    max_width: this.plt.width(),
    max_height: this.plt.height() - this.plt.height() * 0.15
  }

  private resizeCanvasImage(img) {
    var imgWidth = img.width;
    var imgHeight = img.height;
    var ratio = 1;
    var ratio1 = 1;
    var ratio2 = 1;
    ratio1 = this.settings.max_width / imgWidth;
    ratio2 = this.settings.max_height / imgHeight;
    // Use the smallest ratio that the image best fit into the maxWidth x maxHeight box.
    if (ratio1 < ratio2) { ratio = ratio1; } else { ratio = ratio2; }
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");
    var canvasCopy2 = document.createElement("canvas");
    var copyContext2 = canvasCopy2.getContext("2d"); canvasCopy.width = imgWidth; canvasCopy.height = imgHeight; copyContext.drawImage(img, 0, 0);
    // init
    canvasCopy2.width = imgWidth; canvasCopy2.height = imgHeight;
    copyContext2.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvasCopy2.width, canvasCopy2.height);
    var rounds = 2; var roundRatio = ratio * rounds; for (var i = 1; i <= rounds; i++) {
      // tmp
      canvasCopy.width = imgWidth * roundRatio / i;
      canvasCopy.height = imgHeight * roundRatio / i;
      copyContext.drawImage(canvasCopy2, 0, 0, canvasCopy2.width, canvasCopy2.height, 0, 0, canvasCopy.width, canvasCopy.height);
      // copy back
      canvasCopy2.width = imgWidth * roundRatio / i;
      canvasCopy2.height = imgHeight * roundRatio / i;
      copyContext2.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvasCopy2.width, canvasCopy2.height);
    }
    this.canvasElement.width = imgWidth * roundRatio / rounds;
    this.canvasElement.height = imgHeight * roundRatio / rounds;
    this.imgHeight = this.canvasElement.height;
    this.imageResize.src = canvasCopy2.toDataURL();
    this.imageResize.onload = () => {
      this.ctx.drawImage(canvasCopy2, 0, 0, canvasCopy2.width, canvasCopy2.height, 0, 0, this.canvasElement.width, this.canvasElement.height);
    }
  }

  ionViewDidEnter() {
    this.ctx = this.canvasElement.getContext('2d');
    this.canvasPosition = this.canvasElement.getBoundingClientRect();
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.plt.height() - (this.plt.height() * 0.20));
  }

  ngAfterViewInit() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width();
    this.canvasElement.height = this.imgHeight;
  }

  ngOnInit() {}

  async editPerfile() {
    this.dameTodosDatos();
      if (this.nuevaContrasena == this.usuario.contrasena) {
        await this.authService.getUserAuth().subscribe(async (user) =>{
          await this.getCurrentUserCollection(user.uid).subscribe((current) => {
            current.forEach(data =>{
              this.usuario.idRow = data.get("idRow");
              this.firestore.doc('usuario/' + this.usuario.idRow).update(this.usuario);
              this.AllertAll("Éxito", "Se han guardado los cambios");
          })
        });
      })
    }else{
      this.AllertAll("ERROR", "Las contraseñas no coinciden");
    }
  }
  async AllertAll(header: string, message: string) {
    this.allet = await this.alert.create({
      header: header,
      message: message,
      buttons: ['ok'],
    });
    await this.allet.present();
  }



  getCurrentUserCollection(idActual: string) {
    return this.firestore
      .collection('usuario', (ref) => ref.where('id', '==', idActual))
      .get();
  }


}
