import { Component, OnInit } from "@angular/core";

import Swal from "sweetalert2";
import { LoginService } from "../../../services/login.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public loginForm = this.fb.group({
    correo: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  });

  login() {
    this.loginService.login(this.loginForm.value).subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp.tipo == "cliente") {
          // Swal.fire('Cargando', 'Iniciando Sesion', 'info');
          //Navegacion
          this.router.navigateByUrl(
            `/cliente/${resp.datos.id_cliente}/Inicio_Cliente/${resp.datos.id_cliente}`
          );
        }else if(resp.tipo == "admin"){
          this.router.navigateByUrl(
            `/AdministradorCCC/Inicio_Administrador`
          );
        } else if (!resp.datos.status) {
          Swal.fire("Empresa no validada", "Espere validacion", "warning");
        } else {
          // Swal.fire("Cargando", "Iniciando Sesion", "info");
          this.router.navigateByUrl(
            `/empresa/${resp.datos.id_empresa}/Inicio_Empresa/${resp.datos.id_empresa}`
          );
        }
      },
      (err) => {
        console.log(err);
        Swal.fire("Error", "Usuario o Contraseña Incorrecta", "error");
      }
    );
  }
}
