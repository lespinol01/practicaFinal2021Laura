import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-mis-pedidos',
  templateUrl: './ver-mis-pedidos.page.html',
  styleUrls: ['./ver-mis-pedidos.page.scss'],
})
export class VerMisPedidosPage implements OnInit {
  idUsuario:string;
  misPedidos:any;
  constructor(private firestore: AngularFirestore, private act: ActivatedRoute) {
    this.idUsuario = this.act.snapshot.paramMap.get('idUsuario');
    console.log("USUARIO:" + this.idUsuario);


    this.getPedidos();
   }

  ngOnInit() {
  }



  async getPedidos(){
    await this.firestore.collection('pedidos', (ref) => ref.where('idUsuario', '==', this.idUsuario)).snapshotChanges()
    .subscribe(data =>{
      this.misPedidos = data.map(e =>{
        return{
          id: e.payload.doc.id,
          numeroButaca: e.payload.doc.data()['numeroButaca'],
          idCartelera: e.payload.doc.data()['idCartelera'],
          resultado: e.payload.doc.data()['resultado'],
          horarioClickeado: e.payload.doc.data()['horarioClickeado'],
          titulo: e.payload.doc.data()['titulo']
        }
      })
    })
  }

}
