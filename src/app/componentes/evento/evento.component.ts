import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/modelos/evento';
import { EventoService } from 'src/app/servicios/evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {
  eventos!:Evento[];
  constructor(private servicioEvento:EventoService) { }

  ngOnInit(): void {
    this.servicioEvento.obtenerEvento().subscribe(evento =>{
      this.eventos = evento;
    })
  }

}
