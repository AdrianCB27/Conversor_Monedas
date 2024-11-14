import { Component } from '@angular/core';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-convertir',
  templateUrl: './convertir.component.html',
  styleUrl: './convertir.component.css',
})
export class ConvertirComponent {
  public arrayMonedas: string[] = [];
  public valorConversion?:number;

  public cantidad: number = 0;

  public moneda1="";

  public moneda2="";


  constructor(private servicio: ServicioService) {
    this.obtenerMonedas();
  }
  obtenerMonedas():void{
    this.arrayMonedas=this.servicio.obtenerMonedas()
  
  }
  calcularEquivalencia(cantidad:number,monedaPrincipal:string,monedaCambio:string):void{
    this.valorConversion=this.servicio.calcularEquivalencia(cantidad,monedaPrincipal,monedaCambio)
    console.log(this.valorConversion)
  }
}
