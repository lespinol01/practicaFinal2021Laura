import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Cartelera } from 'src/app/models/cartelera.model';
import { DatosPedido } from 'src/app/models/datosPedido';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-resumen-pedido',
  templateUrl: './resumen-pedido.page.html',
  styleUrls: ['./resumen-pedido.page.scss'],
})
export class ResumenPedidoPage implements OnInit {
  public carteleraModel = {} as Cartelera;
  idCartelera:string;
  resultado:string;
  horarioClickeado:string;
  numeroButaca;
  datosPedido:DatosPedido;
  constructor(private firestore: AngularFirestore, public act: ActivatedRoute, private route: Router,
    private authService: AuthService) {
    this.datosPedido = JSON.parse(this.act.snapshot.paramMap.get('datosPedido'))
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCarteleraId();

  }

  async confirmarPedido(){
    await this.authService.getUserAuth().subscribe(async (user)=>{
      this.datosPedido.idUsuario = user.uid;
      console.log(this.datosPedido);

      await this.firestore.collection("pedidos").add(this.datosPedido).then((idPedido) =>{
        this.datosPedido.idPedido = idPedido.id;
        this.firestore.doc("pedidos/" + idPedido.id).update(this.datosPedido);
      });
    })
    this.route.navigate(['/mis-pedidos/',JSON.stringify(this.datosPedido)]);
  }

  async getCarteleraId() {
    await this.firestore
      .doc("cartelera/" + this.datosPedido.idCartelera)
      .valueChanges()
      .subscribe(async data => {
        this.carteleraModel.titulo = data["titulo"];
        this.carteleraModel.imagen = data["imagen"];
        this.carteleraModel.estreno = data["estreno"];
      })
  }
}
