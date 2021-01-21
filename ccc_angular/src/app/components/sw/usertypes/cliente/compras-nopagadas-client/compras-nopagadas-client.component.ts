import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {
  ClienteService,
  TokenPayload,
  UserDetails,
} from "../../../../../services/registerCliente.service";
import {
  VentaProductosService,
  TokenPayloadE,
  UserDetailsE,
} from "../../../../../services/ventasProductos.service";

// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-compras-nopagadas-client",
  templateUrl: "./compras-nopagadas-client.component.html",
  styleUrls: ["./compras-nopagadas-client.component.scss"],
})
export class ComprasNOPagadasClientComponent implements OnInit {
  public VentasListadas;
  loading: boolean = false;
  Buscador_VentasListadas: any;
  pageActual: number = 1;
  public inforCliente: TokenPayload;

  constructor(
    private router: Router,
    private ventasService: VentaProductosService,
    private http: HttpClient,
    private serviceCliente: ClienteService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.infocliente();
  }

  public infocliente() {
    const id_cliente = this.activatedRouter.snapshot.paramMap.get("id_cliente");
    // console.log("EL ID ES: " + id_cliente);

    this.serviceCliente.ListInformacionCliente(id_cliente).subscribe(
      (dataCliente) => {
        this.inforCliente = dataCliente;
        // console.log(this.inforCliente[0].correo);
        // console.log("si lista el cliente");
        this.ListVentasClientes(this.inforCliente[0].correo);
      },
      (err) => {
        console.log(err);
      }
    );
    // const emanilParam = this.inforCliente[0].correo;
  }

  public ListVentasClientes(correoinfcliente: any) {
    //  console.log("paso a el metodo ts: "+correoinfcliente);
    this.VentasListadas = [];

    this.ventasService.ClientVentasNOPagadas(correoinfcliente).subscribe(
      (products) => {
        this.VentasListadas = products;
        //  this.VentasListadas.push(products);
        this.loading = true;
        // console.log(this.VentasListadas);
        if (this.VentasListadas <= 0) {
          Swal.fire({
            title: "<strong>Informacion</strong>",
            icon: "info",
            html: "No disponible",
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> ok!',
            confirmButtonAriaLabel: "Thumbs up, great!",
          });
          this.loading = false;

        }
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
