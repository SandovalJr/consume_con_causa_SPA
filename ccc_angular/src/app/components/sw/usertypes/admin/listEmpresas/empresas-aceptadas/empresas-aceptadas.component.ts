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
  selector: "app-empresas-aceptadas",
  templateUrl: "./empresas-aceptadas.component.html",
  styleUrls: ["./empresas-aceptadas.component.scss"],
})
export class EmpresasAceptadasComponent implements OnInit {
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

  public EliminarEmpresa(id_empresa: any) {
    Swal.fire({
      title: "Seguro que quieres eliminarlo?",
      text: "No podras volver atras!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00a441",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si , Eliminar",
    }).then((result) => {
      if (result.value) {
        this.EmpresasService.EliminarEmpresa(id_empresa).subscribe(
          () => {
            window.location.reload();
            // console.log("Eliminado con exito");
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

public verEmpresaInfo(id_empresa:any){
  this.router.navigateByUrl(
    `/AdministradorCCC/Informacion_Empresa/${id_empresa}`
  );
}
public EditarInfoEmpresa(id_empresa:any){
  this.router.navigateByUrl(
    `/AdministradorCCC/EditarInformacionEmpresa/${id_empresa}`
  );
}

}

