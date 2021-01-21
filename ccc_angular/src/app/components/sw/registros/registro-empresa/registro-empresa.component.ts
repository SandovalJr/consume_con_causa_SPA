import { Component, OnInit } from "@angular/core";
import {
  RegisterService,
  TokenPayloadE,
  UserDetailsE,
} from "../../../../services/register.service";
import Swal from "sweetalert2";
import { MessageErrorsService } from "../../../../services/messageError.service";
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { Router } from "@angular/router";

import {
  RxwebValidators,
  ReactiveFormConfig,
  NumericValueType,
} from "@rxweb/reactive-form-validators";

@Component({
  selector: "app-registro-empresa",
  templateUrl: "./registro-empresa.component.html",
  styleUrls: ["./registro-empresa.component.scss"],
})
export class RegistroEmpresaComponent implements OnInit {
  public formulario: FormGroup;
  details: UserDetailsE;

  credentialsEmpresa: TokenPayloadE = {
    id_empresa: 0,
    nombre: "",
    apellidos: "",
    nombre_empresa: "",
    correo: "",
    telefono: "",
    giro_empresa: "",
    direccion: "",
    cp: 0,
    ciudad: "",
    rfc: "",
    descripcion: "",
    imagen: "",
    link_fb: "",
    link_whatsapp: "",
    password: "",
  };

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private MessageErrorSvr: MessageErrorsService
  ) {}

  ngOnInit(): void {
    this.creatForm();
  }

  public creatForm() {
    this.formulario = new FormGroup({
      nombre: new FormControl(null, [
        RxwebValidators.required(),
      ]),
      apellidos: new FormControl(null, [RxwebValidators.required()]),
      nombre_empresa: new FormControl(null, [RxwebValidators.required()]),
      correo: new FormControl(null, [
        RxwebValidators.required(),
        RxwebValidators.email(),
      ]),
      telefono: new FormControl(null, [RxwebValidators.required()]),
      giro_empresa: new FormControl(null, [RxwebValidators.required()]),
      direccion: new FormControl(null, [RxwebValidators.required()]),
      cp: new FormControl(null, [RxwebValidators.required()]),
      ciudad: new FormControl(null, [RxwebValidators.required()]),
      rfc: new FormControl(null, []),
      descripcion: new FormControl(null, [RxwebValidators.required()]),
      imagen: new FormControl(null, []),
      link_fb: new FormControl(null, []),
      link_whatsapp: new FormControl(null, []),
      password: new FormControl(null, [RxwebValidators.required()]),
    });
  }

  public ValidarFormulario(control: string) {
    if (!this.formulario.controls[control].touched) return { error: undefined };
    return this.MessageErrorSvr.errorMessage(
      this.formulario.controls[control].errors
    );
  }
  registroEmpresa() {
    console.log("Empresa Registrada", this.formulario.value);
    if (this.formulario.valid) {
      this.registerService.registroEmpresa(this.formulario.value).subscribe(
        (resp) => {
          Swal.fire(
            "Registro Completo",
            "Espera la validacion de tu empresa",
            "success"
          );
          this.router.navigateByUrl(``);
        },
        (err) => {
          Swal.fire("Error", "Algo ha fallado", "error");
        }
      );
    } else {
      Swal.fire("Campos Incompletos", "Valida Informacion", "info");
    }
  }
}
