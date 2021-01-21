import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from "@angular/forms";

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  UserDetails,
  ClienteService,
  TokenPayload,
} from "../../../../services/registerCliente.service";
import { MessageErrorsService } from "../../../../services/messageError.service";

import {
  RxwebValidators,
  ReactiveFormConfig,
  NumericValueType,
} from "@rxweb/reactive-form-validators";

// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-registro-clientes",
  templateUrl: "./registro-clientes.component.html",
  styleUrls: ["./registro-clientes.component.scss"],
})
export class RegistroClientesComponent implements OnInit {
  public formulario: FormGroup;
  details: UserDetails;

  crendentialsRegister_Clientes: TokenPayload = {
    id_cliente: 0,
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    fecha_de_nacimiento: "",
    genero: "",
    password: "",
  };

  constructor(
    private router: Router,
    private serviceCliente: ClienteService,
    private MessageErrorSvr: MessageErrorsService
  ) {}

  ngOnInit(): void {
    this.creatForm();
  }

  public creatForm() {
    this.formulario = new FormGroup({
      nombre: new FormControl(null, [RxwebValidators.required()]),
      apellidos: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.alpha(),
      ]),
      correo: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.email(),
      ]),
      telefono: new FormControl(null, [RxwebValidators.required()]),
      fecha_de_nacimiento: new FormControl(null, [RxwebValidators.required()]),
      genero: new FormControl(null, [RxwebValidators.required()]),
      password: new FormControl(null, [RxwebValidators.required()]),
    });
  }

  public ValidarFormulario(control: string) {
    if (!this.formulario.controls[control].touched) return { error: undefined };
    return this.MessageErrorSvr.errorMessage(
      this.formulario.controls[control].errors
    );
  }

  public addCliente() {
    if (this.formulario.valid) {
      this.serviceCliente
        .registerCliente(this.crendentialsRegister_Clientes)
        .subscribe(
          () => {
            Swal.fire(
              "Se Agrego Correctamente",
              "Presiona para continuar..",
              "success"
            );
            // window.location.reload();
            this.router.navigateByUrl(``);
          },
          (err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Cliente ya existente",
            });
            console.error(err);
          }
        );
    } else {
      Swal.fire({
        title: "Campos Incompletos!",
        text: "completa todos para continuar",
        icon: "warning",
      });
    }
  }
}
