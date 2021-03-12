import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home-cine',
  templateUrl: './home-cine.page.html',
  styleUrls: ['./home-cine.page.scss'],
})
export class HomeCinePage implements OnInit {
  dataCartelera: any;
  allet: any;
  constructor(
    private route: Router,
    private firestore: AngularFirestore,
    private AFauth: AngularFireAuth,
    private alert: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    let loader = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    loader.present();
    this.getCarteleraAll(loader);
  }

  async getCarteleraAll(loader?: HTMLIonLoadingElement) {
    await this.firestore
      .collection('cartelera')
      .snapshotChanges()
      .subscribe((data) => {
        this.dataCartelera = data.map((e) => {
          return {
            id: e.payload.doc.id,
            imagen: e.payload.doc.data()['imagen'],
            titulo: e.payload.doc.data()['titulo'],
            descripcion: e.payload.doc.data()['descripcion'],
          };
        });
      });
      loader.dismiss();
  }

  async cerrarSesion() {
    this.AFauth.signOut().then(() => {
      this.alertAll('Sesion acabada', 'Sesion cerrada correctamente');
      this.route.navigate(['/login']);
    });
  }

  public async alertAll(header: string, message: string) {
    this.allet = await this.alert.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

  }
}
