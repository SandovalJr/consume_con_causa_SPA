import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
// import { userInfo } from 'os';

export interface UserDetailsE {
  id_ventap: number;
  nombre: string;
  apellidos: string;
  correo: number;
  telefono: string;
  tipo_pago: string;
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
  id_ventap: number;
  nombre: string;
  apellidos: string;
  correo: number;
  telefono: string;
  tipo_pago: string;
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
export class VentaProductosService {
  baseUrl = "http://localhost:3000/api/Ventas_Productos/";

  constructor(private http: HttpClient) {}

  // Lista de las ventas pagadas y no pagadas
  public VentasNoPagadas(): Observable<any> {
    return this.http.get(`${this.baseUrl}ListEmpresaVentasNoPagadas`);
  }
  public VentasPagadas(): Observable<any> {
    return this.http.get(`${this.baseUrl}ListEmpresasVentasPagadas`);
  }

  //-------------  CLIENTES  ------------//
  // clientes con compras pagadas
  public ClientVentasPagadas(correo: any) {
    return this.http.get(`${this.baseUrl}ListPVentas/${correo}`);
  }

  // clientes con compras no pagadas
  public ClientVentasNOPagadas(correo: any) {
    return this.http.get(`${this.baseUrl}ListNPVentas/${correo}`);
  }

}
