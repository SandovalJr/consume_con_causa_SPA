import { Component, OnInit } from "@angular/core";
import { Routes, Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  ClienteService,
  TokenPayload,
  UserDetails,
} from "../../../../../../services/registerCliente.service";
import { FormControl, FormGroup } from "@angular/forms";

import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { MessageErrorsService } from "../../../../../../services/messageError.service";

// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-edit-info-cliente-admin",
  templateUrl: "./edit-info-cliente-admin.component.html",
  styleUrls: ["./edit-info-cliente-admin.component.scss"],
})
export class EditInfoClienteAdminComponent implements OnInit {
  public inforCliente: TokenPayload;
  public formulario: FormGroup;
  public passwordAnterior: any;

  crendentialsRegister_Clientes: any = {
    id_cliente: 0,
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    fecha_de_nacimiento: "",
    password: "",
  };

  constructor(
    private router: Router,
    private serviceCliente: ClienteService,
    private http: HttpClient,
    private activatedRouter: ActivatedRoute,
    private MessageErrorSvr: MessageErrorsService
  ) {}

  ngOnInit(): void {
    this.creatForm();
    this.InfoClient();
  }

  public InfoClient() {
    const id_cliente = this.activatedRouter.snapshot.paramMap.get("id_cliente");
    // console.log("EL ID ES:" + id_cliente);
    this.serviceCliente.ListInformacionCliente(id_cliente).subscribe(
      (dataCliente) => {
        this.inforCliente = dataCliente;
        this.crendentialsRegister_Clientes.nombre = this.inforCliente[0].nombre;
        this.crendentialsRegister_Clientes.apellidos = this.inforCliente[0].apellidos;
        this.crendentialsRegister_Clientes.correo = this.inforCliente[0].correo;
        this.crendentialsRegister_Clientes.telefono = this.inforCliente[0].telefono;
        this.crendentialsRegister_Clientes.fecha_de_nacimiento = this.inforCliente[0].fecha_de_nacimiento;
        this.crendentialsRegister_Clientes.password = this.inforCliente[0].password;
        // console.log(dataCliente);
        this.passwordAnterior = this.inforCliente[0].password;
        // console.log(this.passwordAnterior);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public creatForm() {
    this.formulario = new FormGroup({
      nombre: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.alpha(),
      ]),
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
      password: new FormControl(null, [RxwebValidators.required()]),
    });
  }

  public ValidarFormulario(control: string) {
    if (!this.formulario.controls[control].touched) return { error: undefined };
    return this.MessageErrorSvr.errorMessage(
      this.formulario.controls[control].errors
    );
  }

  public actualizarClient() {
    const id_cliente = this.activatedRouter.snapshot.paramMap.get("id_cliente");
    // console.log(this.crendentialsRegister_Clientes);
    // console.log(this.formulario);
    if (this.formulario.valid) {
      if (
        this.passwordAnterior === this.crendentialsRegister_Clientes.password
      ) {
        this.serviceCliente
          .ActInfoClientMISMAPASSWORD(
            id_cliente,
            this.crendentialsRegister_Clientes
          )
          .subscribe(
            () => {
              Swal.fire(
                "Se Actualizo Correctamente",
                "Presiona para continuar..",
                "success"
              );
              this.router.navigateByUrl(`/AdministradorCCC/Lista_Clientes`);
            },
            (err) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un error",
              });
              console.error(err);
            }
          );
      } else if (!this.formulario.valid) {
        Swal.fire({
          title: "Campos Incompletos!",
          text: "completa todos para continuar",
          icon: "warning",
        });
      }
    } else {
      Swal.fire({
        title: "Campos Incompletos!",
        text: "completa todos para continuar",
        icon: "warning",
      });
    }
    if (this.passwordAnterior != this.crendentialsRegister_Clientes.password) {
      this.serviceCliente
        .ActInfoClient(id_cliente, this.crendentialsRegister_Clientes)
        .subscribe(
          () => {
            Swal.fire(
              "Se Actualizo Correctamente",
              "Presiona para continuar..",
              "success"
            );
            this.router.navigateByUrl(`/AdministradorCCC/Lista_Clientes`);
          },
          (err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Ocurrio un error",
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
