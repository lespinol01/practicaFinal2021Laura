import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import {Platform} from '@ionic/angular';
import { Cartelera } from 'src/app/models/cartelera.model';
import { DatosPedido } from 'src/app/models/datosPedido';
import { Horarios } from 'src/app/models/horarios.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-seleccionada',
  templateUrl: './seleccionada.page.html',
  styleUrls: ['./seleccionada.page.scss'],
})
export class SeleccionadaPage implements OnInit {
  rangeValue:number;
  resultado:number;
  public carteleraModel = {} as Cartelera;
  public horariosModel = {} as Horarios;
  usuario={} as Usuario;
  idCartelera:string;
  idHorario:string;
  numeroButaca:string;
  horarioClickeado:string;
  datosPedido: DatosPedido;
  public boton:boolean = true;


  constructor(private route: Router, public act: ActivatedRoute,
    private firestore: AngularFirestore) {
      this.idCartelera = this.act.snapshot.paramMap.get('idCartelera');
      console.log(this.idCartelera);

    }

    ngOnInit() {
    }

    ionViewWillEnter() {
      this.getCarteleraId();
    }

    crearPedido(){
      this.datosPedido = new DatosPedido(this.numeroButaca,this.idCartelera,this.resultado,
        this.horarioClickeado,this.carteleraModel.titulo);

      this.route.navigate(['/elegir-butacas',JSON.stringify(this.datosPedido)]);
    }

    multiplicar():number{
    this.numeroButaca = this.rangeValue.toString();
    this.resultado = Math.round((8.6*this.rangeValue)*100)/100;
    return this.resultado;
  }


  horarioSeleccionadoUno(id):boolean{
    this.boton = false;
    this.horarioClickeado = this.horariosModel.horarioUno;
    document.getElementById(id).setAttribute('color', 'danger');
    document.getElementById(id).setAttribute('disabled', 'true');

    document.getElementById("horarioDos").setAttribute('disabled', 'true');
    document.getElementById("horarioTres").setAttribute('disabled', 'true');

    return true;
  }

  habilitarBotones(){
    this.boton = true;
    this.horarioClickeado="";
    document.getElementById("horarioUno").setAttribute('disabled', 'false');
    document.getElementById("horarioDos").setAttribute('disabled', 'false');
    document.getElementById("horarioTres").setAttribute('disabled', 'false');

    document.getElementById("horarioUno").setAttribute('color', 'warning');
    document.getElementById("horarioDos").setAttribute('color', 'warning');
    document.getElementById("horarioTres").setAttribute('color', 'warning');
  }

  horarioSeleccionadoDos(id):boolean{
    this.boton = false;
    this.horarioClickeado = this.horariosModel.horarioDos;
    document.getElementById(id).setAttribute('color', 'danger');

    document.getElementById(id).setAttribute('disabled', 'true');
    document.getElementById("horarioUno").setAttribute('disabled', 'true');
    document.getElementById("horarioTres").setAttribute('disabled', 'true');
    return true;
  }

  horarioSeleccionadoTres(id):boolean{
    this.boton = false;
    this.horarioClickeado = this.horariosModel.horarioTres;
    document.getElementById(id).setAttribute('color', 'danger');
    document.getElementById(id).setAttribute('disabled', 'true');

    document.getElementById("horarioUno").setAttribute('disabled', 'true');
    document.getElementById("horarioDos").setAttribute('disabled', 'true');
    return true;
  }


  async getCarteleraId() {
    await this.firestore
      .doc("cartelera/" + this.idCartelera)
      .valueChanges()
      .subscribe(async data => {

        this.carteleraModel.titulo = data["titulo"];
        this.carteleraModel.imagen = data["imagen"];
        this.carteleraModel.duracion = data["duracion"];
        this.carteleraModel.pais = data["pais"];
        this.carteleraModel.genero = data["genero"];
        this.carteleraModel.estreno = data["estreno"];
        this.carteleraModel.directores = data["directores"];
        this.carteleraModel.guionistas = data["guionistas"];
        this.carteleraModel.productores = data["productores"];
        this.carteleraModel.actores = data["actores"];
        this.carteleraModel.idCartelera = data["idCartelera"];
        this.idHorario = data["horarios"];

        await this.firestore
        .doc("horarios/" + this.idHorario)
        .valueChanges()
        .subscribe(data => {

          this.horariosModel.horarioUno = data["horarioUno"];
          this.horariosModel.horarioDos = data["horarioDos"];
          this.horariosModel.horarioTres = data["horarioTres"];
        });
      });


  }


}
