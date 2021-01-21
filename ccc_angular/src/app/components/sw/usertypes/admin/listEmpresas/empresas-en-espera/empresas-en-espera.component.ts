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
  RegisterService,
  TokenPayloadE,
  UserDetailsE,
} from "../../../../../../services/register.service";

// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-empresas-en-espera",
  templateUrl: "./empresas-en-espera.component.html",
  styleUrls: ["./empresas-en-espera.component.scss"],
})
export class EmpresasEnEsperaComponent implements OnInit {
  public EmpresasAceptadas: Array<any> = [];
  loading: boolean = false;
  Buscador_Empresas: any;
  pageActual: number = 1;

  constructor(
    private router: Router,
    private EmpresasService: RegisterService,
    private http: HttpClient,
    private activatedRouter: ActivatedRoute
  ) {}

  public listEmpresa() {
    const status = this.activatedRouter.snapshot.paramMap.get("status");
    // console.log(status);

    this.EmpresasAceptadas = [];

    this.EmpresasService.ListEmpresas(status).subscribe(
      (empresas) => {
        // console.log(empresas);
        this.EmpresasAceptadas = empresas;
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

  ngOnInit(): void {
    this.listEmpresa();
  }

  public aprobarEmpresa(id_empresa: any) {
    const status = 1;
    this.EmpresasService.AutorizarEmpresa(id_empresa, status).subscribe(
      () => {
        Swal.fire(
          "Se Autorizo la empresa correctamente!",
          "Presiona para continuar..",
          "success"
        );
        // this.router.navigateByUrl(`/AdministradorCCC/EmpresasAceptadas/1`);
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
  }
}
