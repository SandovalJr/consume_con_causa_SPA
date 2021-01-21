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
  selector: "app-inicio-cliente",
  templateUrl: "./inicio-cliente.component.html",
  styleUrls: ["./inicio-cliente.component.scss"],
})
export class InicioClienteComponent implements OnInit {
  public inforCliente: TokenPayload;

  constructor(
    private router: Router,
    private donacionService: DONACIONProductosService,
    private http: HttpClient,
    private serviceCliente: ClienteService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tomaid();
  }

  public tomaid() {
    const id_cliente = this.activatedRouter.snapshot.paramMap.get("id_cliente");
    console.log("EL ID ES: " + id_cliente);
    this.serviceCliente.ListInformacionCliente(id_cliente).subscribe(
      (dataCliente) => {
        this.inforCliente = dataCliente;
        // console.log(this.inforCliente);

        // console.log(this.inforCliente[0].correo);
        // console.log("hola");
        // console.log(dataCliente);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
