import { Component, OnInit } from "@angular/core";
import {
  RegisterService,
  TokenPayloadE,
  UserDetailsE,
} from "../../../../../../services/register.service";
import { MessageErrorsService } from "../../../../../../services/messageError.service";
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

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
  selector: "app-ver-info-empresa",
  templateUrl: "./ver-info-empresa.component.html",
  styleUrls: ["./ver-info-empresa.component.scss"],
})
export class VerInfoEmpresaComponent implements OnInit {
  public formulario: FormGroup;
  details: UserDetailsE;
  public infoEmpresat: TokenPayloadE;

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
    private EmpresasService: RegisterService,
    private MessageErrorSvr: MessageErrorsService,
    private activatedRouter: ActivatedRoute
  ) {
    Swal.fire({
      title: "<strong>AVISO!</strong>",
      icon: "info",
      html: "Solo podras ver la <b>Informacion</b>",
      showCloseButton: true,

      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK!',
    });
  }

  ngOnInit(): void {
    this.infoEmpresa();
    this.creatForm();
  }

  public infoEmpresa() {
    const id_empresa = this.activatedRouter.snapshot.paramMap.get("id_empresa");
    // console.log(id_empresa);
    this.EmpresasService.InfoEmpresa(id_empresa).subscribe(
      (dataCliente) => {
        this.infoEmpresat = dataCliente;
        this.credentialsEmpresa.nombre = this.infoEmpresat[0].nombre;
        this.credentialsEmpresa.apellidos = this.infoEmpresat[0].apellidos;
        this.credentialsEmpresa.nombre_empresa = this.infoEmpresat[0].nombre_empresa;
        this.credentialsEmpresa.correo = this.infoEmpresat[0].correo;
        this.credentialsEmpresa.telefono = this.infoEmpresat[0].telefono;
        this.credentialsEmpresa.giro_empresa = this.infoEmpresat[0].giro_empresa;
        this.credentialsEmpresa.direccion = this.infoEmpresat[0].direccion;
        this.credentialsEmpresa.cp = this.infoEmpresat[0].cp;
        this.credentialsEmpresa.ciudad = this.infoEmpresat[0].ciudad;
        this.credentialsEmpresa.rfc = this.infoEmpresat[0].rfc;
        this.credentialsEmpresa.descripcion = this.infoEmpresat[0].descripcion;
        // this.credentialsEmpresa.imagen = this.infoEmpresat[0].imagen;
        this.credentialsEmpresa.link_fb = this.infoEmpresat[0].link_fb;
        this.credentialsEmpresa.link_whatsapp = this.infoEmpresat[0].link_whatsapp;
        this.credentialsEmpresa.password = this.infoEmpresat[0].password;

        // console.log(dataCliente);
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
}
