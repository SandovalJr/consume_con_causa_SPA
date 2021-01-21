import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
// import { userInfo } from 'os';

export interface UserDetailsE {
  id_donacion: number;
  nombre: string;
  apellidos: string;
  correo: number;
  telefono: string;
  tipo_pago: string;
  organizacion_dona: string;
  nombre_producto: number;
  descripcion_producto: string;
  cantidad_producto: number;
  total_compra: number;
  imagen_producto: string;
  fecha_compra: string;
  estatus_compra: string;
  nombre_empresa: string;
  exp: number;
  iat: number;
}

export interface TokenPayloadE {
  id_donacion: number;
  nombre: string;
  apellidos: string;
  correo: number;
  telefono: string;
  tipo_pago: string;
  organizacion_dona: string;
  nombre_producto: number;
  descripcion_producto: string;
  cantidad_producto: number;
  total_compra: number;
  imagen_producto: string;
  fecha_compra: string;
  estatus_compra: string;
  nombre_empresa: string;
}

@Injectable({
  providedIn: "root",
})
export class DONACIONProductosService {
  baseUrl = "http://localhost:3000/api/donacion_productos/";

  constructor(private http: HttpClient) {}

  // Lista de las donaciones pagadas y no pagadas
  public DonacionesNoPagadas(): Observable<any> {
    return this.http.get(`${this.baseUrl}EmpresaListDNP`);
  }
  public DonacionesPagadas(): Observable<any> {
    return this.http.get(`${this.baseUrl}EmpresaListDPagado`);
  }

  // donaciones no pagadas por correo (cliente)
  public DonacionesNoPagadasPorNombreDeeMPRESA(correo: any): Observable<any> {
    // console.log("servicio "+ correo);
    return this.http.get(`${this.baseUrl}EmpresaListDNP/${correo}`);
  }

  // donaciones pagadas por correo (cliente)
  public DonacionesPagadasPorCorreo(correo: any): Observable<any> {
    return this.http.get(`${this.baseUrl}ListDPPagado/${correo}`);
  }
}
