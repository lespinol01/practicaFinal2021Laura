import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatosPedido } from 'src/app/models/datosPedido';

@Component({
  selector: 'app-elegir-butacas',
  templateUrl: './elegir-butacas.page.html',
  styleUrls: ['./elegir-butacas.page.scss'],
})
export class ElegirButacasPage implements OnInit {
  numeroButaca;
  idCartelera;
  public array = Array(50);
  numeroSeleccionadas: number = 0;
  resultado:string;
  horarioClickeado:string;
  datosPedido: DatosPedido;
  constructor(public act: ActivatedRoute) {
    this.datosPedido = JSON.parse(this.act.snapshot.paramMap.get('datosPedido'))


  }

  ngOnInit() {}

  butacasClick(id) {
    this.numeroSeleccionadas++;

    if (this.datosPedido.numeroButaca >= this.numeroSeleccionadas.toString()) {
      document.getElementById(id).setAttribute('color', 'danger');
    }

  }
}
