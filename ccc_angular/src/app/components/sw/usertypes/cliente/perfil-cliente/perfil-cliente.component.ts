import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { Routes, Router, ActivatedRoute } from "@angular/router";
import {
  ClienteService,
  TokenPayload,
  UserDetails,
} from "../../../../../services/registerCliente.service";

@Component({
  selector: "app-perfil-cliente",
  templateUrl: "./perfil-cliente.component.html",
  styleUrls: ["./perfil-cliente.component.scss"],
})
export class PerfilClienteComponent implements OnInit {
  public inforCliente: TokenPayload;

  constructor(
    private activatedRouter: ActivatedRoute,
    private serviceCliente: ClienteService
  ) {}

  ngOnInit(): void {
    this.InformacionCliente();
  }

  public InformacionCliente() {
    const id_cliente = this.activatedRouter.snapshot.paramMap.get("id_cliente");
    // console.log("EL ID ES: " + id_cliente);
    this.serviceCliente.ListInformacionCliente(id_cliente).subscribe(
      (dataCliente) => {
        this.inforCliente = dataCliente;
        console.log(this.inforCliente);

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
