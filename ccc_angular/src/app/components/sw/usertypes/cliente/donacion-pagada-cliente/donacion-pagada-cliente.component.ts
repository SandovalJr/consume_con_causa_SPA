import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {
  ClienteService,
  TokenPayload,
  UserDetails,
} from "../../../../../services/registerCliente.service";
import {
  DONACIONProductosService,
  TokenPayloadE,
  UserDetailsE,
} from "../../../../../services/donacionProducto.service";

// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-donacion-pagada-cliente",
  templateUrl: "./donacion-pagada-cliente.component.html",
  styleUrls: ["./donacion-pagada-cliente.component.scss"],
})
export class DonacionPagadaClienteComponent implements OnInit {
  public DonacionesListadas;
  loading: boolean = false;
  Buscador_Clientes: any;
  pageActual: number = 1;
  public inforCliente: TokenPayload;

  constructor(
    private router: Router,
    private donacionService: DONACIONProductosService,
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
        // console.log(emanilParam);
        this.ListDonacionesNoPagadas(this.inforCliente[0].correo);
      },
      (err) => {
        console.log(err);
      }
    );
    // const emanilParam = this.inforCliente[0].correo;
  }

  public ListDonacionesNoPagadas(correoinfcliente: any) {
    // console.log("paso a el metodo ts: "+correoinfcliente);

    this.DonacionesListadas = [];

    this.donacionService.DonacionesPagadasPorCorreo(correoinfcliente).subscribe(
      (products) => {
        // console.log(products);
        this.DonacionesListadas = products;
        this.loading = true;

        if (this.DonacionesListadas < 1) {
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
