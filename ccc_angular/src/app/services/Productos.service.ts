import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
// import { userInfo } from 'os';

export interface UserDetailsE {
  id_producto: number;
  nombre: string;
  categoria: string;
  precio: number;
  genero: string;
  descripcion: string;
  stock: number;
  marca: string;
  otras_caracteristicas: string;
  created: string;
  nombre_empresa: string;
  imagen: string;
  exp: number;
  iat: number;
}

export interface TokenPayloadE {
  id_producto: number;
  nombre: string;
  categoria: string;
  precio: number;
  genero: string;
  descripcion: string;
  stock: number;
  marca: string;
  otras_caracteristicas: string;
  created: string;
  nombre_empresa: string;
  imagen: string;
}

@Injectable({
  providedIn: "root",
})
export class ProductoRegisterService {
  baseUrl = "http://localhost:3000/api/productos/";

  constructor(private http: HttpClient) {}

  // Listar todos los productos en general (admin)
  public ListProductosEmpresa(): Observable<any> {
    return this.http.get(`${this.baseUrl}LPEGeneral`);
  }

  // eliminar producto
  public EliminarProducto(id_producto: any) {
    return this.http.get(`${this.baseUrl}/eliminarProducto/${id_producto}`);
  }
}
