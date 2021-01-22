import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { Routes, Router, ActivatedRoute } from "@angular/router";
import {
  ClienteService,
  TokenPayload,
  UserDetails,
} from "../../../../../services/registerCliente.service";

@Component({
  selector: "app-sidenav-cliente",
  templateUrl: "./sidenav-cliente.component.html",
  styleUrls: ["./sidenav-cliente.component.scss"],
})
export class SidenavClienteComponent implements OnInit {
  public inforCliente: TokenPayload;

  mobileQuery: MediaQueryList;
  fillerNav = [
    // {
    //   name: "Inicio",
    //   route: "/AdministradorCCC/Inicio_Administrador",
    //   icon: "home",
    // },
  ];

  private _mobileQueryListener: () => void;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private serviceCliente: ClienteService
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  shouldRun = true;
  ngOnInit(): void {
    this.InformacionCliente();
  }

  public InformacionCliente() {
    const id_cliente = this.activatedRouter.snapshot.paramMap.get("id_cliente");
    // console.log("EL ID ES: " + id_cliente);
    this.serviceCliente.ListInformacionCliente(id_cliente).subscribe(
      (dataCliente) => {
        this.inforCliente = dataCliente;

        this.inforCliente = this.inforCliente[0].nombre;
        // console.log(this.inforCliente);

        // console.log(this.inforCliente[0].correo);
        // console.log("hola");
        // console.log(dataCliente);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public goToInicio() {
    const id_cliente = this.activatedRouter.snapshot.paramMap.get("id_cliente");
    // console.log(id_cliente);

    this.router.navigateByUrl(
      `/cliente/${id_cliente}/Inicio_Cliente/${id_cliente}`
    );
  }

  public goToProfile() {
    const id_cliente = this.activatedRouter.snapshot.paramMap.get("id_cliente");
    this.router.navigateByUrl(
      `/cliente/${id_cliente}/PerfilCliente/${id_cliente}`
    );
  }

  public goToComprasFinalizadas() {
    const id_cliente = this.activatedRouter.snapshot.paramMap.get("id_cliente");
    this.router.navigateByUrl(
      `/cliente/${id_cliente}/ComprasFinalizadas/${id_cliente}`
    );
  }

  public goToNoFinalizado() {
    const id_cliente = this.activatedRouter.snapshot.paramMap.get("id_cliente");
    this.router.navigateByUrl(
      `/cliente/${id_cliente}/ComprasNoFinalizadas/${id_cliente}`
    );
  }

  public goToDonacionPagada() {
    const id_cliente = this.activatedRouter.snapshot.paramMap.get("id_cliente");
    this.router.navigateByUrl(
      `/cliente/${id_cliente}/DonacionesPagadas/${id_cliente}`
    );
  }

  public goToDonacionNoPagada() {
    const id_cliente = this.activatedRouter.snapshot.paramMap.get("id_cliente");
    this.router.navigateByUrl(
      `/cliente/${id_cliente}/DonacionesNoPagadas/${id_cliente}`
    );
  }
}
