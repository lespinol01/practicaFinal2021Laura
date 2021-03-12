import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Cartelera } from 'src/app/models/cartelera.model';
import { DatosPedido } from 'src/app/models/datosPedido';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.page.html',
  styleUrls: ['./mis-pedidos.page.scss'],
})
export class MisPedidosPage implements OnInit {
  public carteleraModel = {} as Cartelera;
  idCartelera:string;
  numeroButaca;
  resultado:string;
  datosPedido: DatosPedido;

  constructor(private firestore: AngularFirestore, public act: ActivatedRoute,private route:Router, private authService: AuthService
    ) {
    this.datosPedido = JSON.parse(this.act.snapshot.paramMap.get('datosPedido'))
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCarteleraId();

  }

  async getCarteleraId() {
    await this.firestore
      .doc("cartelera/" + this.datosPedido.idCartelera)
      .valueChanges()
      .subscribe(async data => {
        this.carteleraModel.titulo = data["titulo"];
      })
      console.log(this.datosPedido);

    }

    async verMisPedidos(){
    console.log(this.datosPedido);
    await this.authService.getUserAuth().subscribe((user) =>{
      this.route.navigate(['/ver-mis-pedidos',user.uid]);
    })
  }
}
