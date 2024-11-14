import { Injectable } from '@angular/core';
import { ConversorMonedas } from '../interfaces/ConversorMonedas';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  public apiKey: string = '22ed9d82081e53fad778159d4191190f';
  private serviceUrl: string = 'https://api.exchangeratesapi.io/v1';
  public listaMonedas: { [key: string]: number } = {};
  public listaDeMonedas: string[] = [];

  constructor(private http: HttpClient) {
    const params = new HttpParams().set('access_key', this.apiKey);
    this.http
      .get<ConversorMonedas>(`${this.serviceUrl}/latest?`, { params })
      .subscribe((resp) => {
        this.listaDeMonedas = Object.keys(resp.rates);
        this.listaMonedas = Object(resp.rates);
        // console.log(this.listaDeMonedas);
      });
  }
  public obtenerMonedas(): string[] {
    return this.listaDeMonedas;
  }

  public calcularEquivalencia(cantidad: number,monedaPrincipal: string,monedaCambio: string) {
    if (monedaPrincipal === 'EUR') {
      return this.euroAMoneda(cantidad, monedaCambio);
    } else if (monedaCambio === 'EUR') {
      return this.monedaAEuro(cantidad, monedaPrincipal);
    } else {
      return this.cambioGeneral(cantidad, monedaPrincipal, monedaCambio);
    }
  }
  
  public euroAMoneda(cantidad: number, monedaCambio: string) {
    let valorMoneda: number = this.listaMonedas[monedaCambio];
    return cantidad * valorMoneda;
  }
  public monedaAEuro(cantidad: number, monedaPrincipal: string) {
    let valorMoneda: number = this.listaMonedas[monedaPrincipal];
    return cantidad / valorMoneda;
  }
  public cambioGeneral(cantidad: number,monedaPrincipal: string,monedaCambio: string) {
    let valorMonedaCambio: number = this.listaMonedas[monedaCambio];
    let valorEnEuro = this.monedaAEuro(cantidad, monedaPrincipal);
    return parseFloat((valorEnEuro * valorMonedaCambio).toFixed(2));
  }
}
