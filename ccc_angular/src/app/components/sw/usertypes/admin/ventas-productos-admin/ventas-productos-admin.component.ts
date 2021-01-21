import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { fromEvent } from "rxjs";
import { debounceTime, take, pluck, switchMap } from "rxjs/operators";
import { Routes, Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import {
  TokenPayloadE,
  UserDetailsE,
  VentaProductosService,
} from "../../../../../services/ventasProductos.service";

// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");
@Component({
  selector: "app-ventas-productos-admin",
  templateUrl: "./ventas-productos-admin.component.html",
  styleUrls: ["./ventas-productos-admin.component.scss"],
})
export class VentasProductosAdminComponent implements OnInit {
  public VentasProductos: Array<any> = [];
  loading: boolean = false;
  Buscador_Empresas: any;
  pageActual: number = 1;
  public estatus_compra = this.activatedRouter.snapshot.paramMap.get(
    "estatus_compra"
  );
  constructor(
    private router: Router,
    private VentaProductoService: VentaProductosService,
    private http: HttpClient,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listarVentasProductor();
  }

  public listarVentasProductor() {
    const estatus_compra = this.activatedRouter.snapshot.paramMap.get(
      "estatus_compra"
    );
    if (estatus_compra === "NoPagado") {
      this.VentasProductos = [];
      this.VentaProductoService.VentasNoPagadas().subscribe(
        (empresas) => {
          console.log(empresas);
          this.VentasProductos = empresas;
          this.loading = true;
        },
        (err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salio mal!",
          });
          console.error(err);
        }
      );
    } else if (estatus_compra === "Pagado") {
      this.VentasProductos = [];

      this.VentaProductoService.VentasPagadas().subscribe(
        (empresas) => {
          // console.log(empresas);
          this.VentasProductos = empresas;
          this.loading = true;
        },
        (err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salio mal!",
          });
          console.error(err);
        }
      );
    }
  }
}
