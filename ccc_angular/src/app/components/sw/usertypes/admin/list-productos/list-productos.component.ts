import {
  Component,
  OnInit,
} from "@angular/core";
import {  Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import {
  ProductoRegisterService,
  TokenPayloadE,
  UserDetailsE,
} from "../../../../../services/Productos.service";

// SWEETALERT 2
// declarar variable de esta manera para que no marque err
declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-list-productos",
  templateUrl: "./list-productos.component.html",
  styleUrls: ["./list-productos.component.scss"],
})
export class ListProductosComponent implements OnInit {
  public ProductosListados: Array<any> = [];
  loading: boolean = false;
  Buscador_Clientes: any;
  pageActual: number = 1;

  constructor(
    private router: Router,
    private productService: ProductoRegisterService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.productosList();
  }

  public productosList() {
    this.ProductosListados = [];
    this.productService.ListProductosEmpresa().subscribe(
      (products) => {
        // console.log(products);
        this.ProductosListados = products;
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

  public eliminarproductoAdmin(id_producto: any) {
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
        this.productService.EliminarProducto(id_producto).subscribe(
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
}
