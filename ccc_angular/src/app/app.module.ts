import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";

import { MDBBootstrapModule } from "angular-bootstrap-md";
import { SpaComponent } from "./components/spa/spa.component";
import { NavbarComponent } from "./components/spa/partials/navbar/navbar.component";
import { VideoInicioComponent } from "./components/spa/partials/video-inicio/video-inicio.component";
import { BannerverdeComponent } from "./components/spa/partials/bannerverde/bannerverde.component";
import { UneteALaCausaComponent } from "./components/spa/partials/unete-a-la-causa/unete-a-la-causa.component";
import { LineasComponent } from "./components/spa/partials/lineas/lineas.component";
import { CumplirSuenosComponent } from "./components/spa/partials/cumplir-suenos/cumplir-suenos.component";
import { ComoComprarComponent } from "./components/spa/partials/como-comprar/como-comprar.component";
import { PreguntasFrecuentesComponent } from "./components/spa/partials/preguntas-frecuentes/preguntas-frecuentes.component";
import { FooterComponent } from "./components/spa/partials/footer/footer.component";
import { APP_ROUTES } from "../app/routes/routes";
import { LoginComponent } from "./components/sw/login/login.component";
import { RegistrosComponent } from "./components/sw/registros/registros.component";
import { RegistroEmpresaComponent } from "./components/sw/registros/registro-empresa/registro-empresa.component";
import { RegistroClientesComponent } from "./components/sw/registros/registro-clientes/registro-clientes.component";
import { EditInfoClienteAdminComponent } from './components/sw/usertypes/admin/list-clientes-admin/edit-info-cliente-admin/edit-info-cliente-admin.component';

// SERVICIOS
import { MessageErrorsService } from "../app/services/messageError.service";
import { ClienteService } from "../app/services/registerCliente.service";
import { AdminComponent } from "./components/sw/usertypes/admin/admin.component";
import { ClienteComponent } from "./components/sw/usertypes/cliente/cliente.component";
import { EmpresaComponent } from "./components/sw/usertypes/empresa/empresa.component";
import { SidenavadminComponent } from "./components/sw/usertypes/admin/sidenavadmin/sidenavadmin.component";

// ANGULAR MATERIAL
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { InicioadminComponent } from "./components/sw/usertypes/admin/inicioadmin/inicioadmin.component";
import { SidenavEmpresaComponent } from "./components/sw/usertypes/empresa/sidenav-empresa/sidenav-empresa.component";
import { SidenavClienteComponent } from "./components/sw/usertypes/cliente/sidenav-cliente/sidenav-cliente.component";
import { InicioClienteComponent } from "./components/sw/usertypes/cliente/inicio-cliente/inicio-cliente.component";
import { InicioEmpresaComponent } from "./components/sw/usertypes/empresa/inicio-empresa/inicio-empresa.component";
import { ListClientesAdminComponent } from "./components/sw/usertypes/admin/list-clientes-admin/list-clientes-admin.component";

// BUSCADOR
import { Ng2SearchPipeModule } from "ng2-search-filter";
// PAGINACION
import { NgxPaginationModule } from "ngx-pagination";
import { EmpresasAceptadasComponent } from './components/sw/usertypes/admin/listEmpresas/empresas-aceptadas/empresas-aceptadas.component';
import { EmpresasEnEsperaComponent } from './components/sw/usertypes/admin/listEmpresas/empresas-en-espera/empresas-en-espera.component';
import { VerInfoEmpresaComponent } from './components/sw/usertypes/admin/listEmpresas/ver-info-empresa/ver-info-empresa.component';
import { EditarinfoEmpresaComponent } from './components/sw/usertypes/admin/listEmpresas/editarinfo-empresa/editarinfo-empresa.component';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { ListProductosComponent } from './components/sw/usertypes/admin/list-productos/list-productos.component';
import { VentasProductosAdminComponent } from './components/sw/usertypes/admin/ventas-productos-admin/ventas-productos-admin.component';
import { DonacionesProductosAdminComponent } from './components/sw/usertypes/admin/donaciones-productos-admin/donaciones-productos-admin.component';
import { DonacionesProductosAdminNOAPROBADOSComponent } from './components/sw/usertypes/admin/donaciones-productos-admin-noaprobados/donaciones-productos-admin-noaprobados.component';
import { VentasProductosNPComponent } from './components/sw/usertypes/admin/ventas-productos-admin/ventas-productos-np/ventas-productos-np.component';
import { ComprasPagadasClientComponent } from './components/sw/usertypes/cliente/compras-pagadas-client/compras-pagadas-client.component';
import { ComprasNOPagadasClientComponent } from './components/sw/usertypes/cliente/compras-nopagadas-client/compras-nopagadas-client.component';
import { DonacionPagadaClienteComponent } from './components/sw/usertypes/cliente/donacion-pagada-cliente/donacion-pagada-cliente.component';
import { DonacionNOPagadaClienteComponent } from './components/sw/usertypes/cliente/donacion-nopagada-cliente/donacion-nopagada-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    SpaComponent,
    NavbarComponent,
    VideoInicioComponent,
    BannerverdeComponent,
    UneteALaCausaComponent,
    LineasComponent,
    CumplirSuenosComponent,
    ComoComprarComponent,
    PreguntasFrecuentesComponent,
    FooterComponent,
    LoginComponent,
    RegistrosComponent,
    RegistroEmpresaComponent,
    RegistroClientesComponent,
    AdminComponent,
    ClienteComponent,
    EmpresaComponent,
    SidenavadminComponent,
    InicioadminComponent,
    SidenavEmpresaComponent,
    SidenavClienteComponent,
    InicioClienteComponent,
    InicioEmpresaComponent,
    ListClientesAdminComponent,

    EditInfoClienteAdminComponent,

    EmpresasAceptadasComponent,

    EmpresasEnEsperaComponent,

    VerInfoEmpresaComponent,

    EditarinfoEmpresaComponent,

    ListProductosComponent,

    VentasProductosAdminComponent,

    DonacionesProductosAdminComponent,

    DonacionesProductosAdminNOAPROBADOSComponent,

    VentasProductosNPComponent,

    ComprasPagadasClientComponent,

    ComprasNOPagadasClientComponent,

    DonacionPagadaClienteComponent,

    DonacionNOPagadaClienteComponent,

  ],
  imports: [
    APP_ROUTES,
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ANGULAR MATERIAL
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    // Paginacion
    NgxPaginationModule,
    // Search
    Ng2SearchPipeModule,
    RxReactiveFormsModule
  ],
  exports: [
    MatTabsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
