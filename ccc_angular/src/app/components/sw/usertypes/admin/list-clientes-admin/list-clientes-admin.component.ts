import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { Routes, Router } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  ClienteService,
  TokenPayload,
  UserDetails,
} from "../../../../../services/registerCliente.service";

// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-list-clientes-admin",
  templateUrl: "./list-clientes-admin.component.html",
  styleUrls: ["./list-clientes-admin.component.scss"],
})
export class ListClientesAdminComponent implements OnInit {
  public UsuariosListados: Array<any> = [];
  loading: boolean = false;
  Buscador_Clientes: any;
  pageActual: number = 1;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.listClientes();
  }

  public listClientes() {
    this.UsuariosListados = [];
    this.clienteService.ListClientes().subscribe(
      (clientes) => {
        // console.log(clientes);
        this.UsuariosListados = clientes;
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

  public eliminarCliente(id_cliente: any) {
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
        this.clienteService.EliminarCliente(id_cliente).subscribe(
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

  public gotoEdit(id_cliente: any) {
    this.router.navigateByUrl(
      `/AdministradorCCC/EditarInformacioCliente/${id_cliente}`
    );
  }

}
