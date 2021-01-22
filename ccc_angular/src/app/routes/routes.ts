import { RouterModule, Routes } from "@angular/router";
import { Component } from "@angular/core";
import { SpaComponent } from "../components/spa/spa.component";
import { LoginComponent } from "../components/sw/login/login.component";

// REGISTROS
import { RegistrosComponent } from "../components/sw/registros/registros.component";
import { RegistroEmpresaComponent } from "../components/sw/registros/registro-empresa/registro-empresa.component";
import { RegistroClientesComponent } from "../components/sw/registros/registro-clientes/registro-clientes.component";

// ADMINISTRADOR
import { AdminComponent } from "../components/sw/usertypes/admin/admin.component";
import { InicioadminComponent } from "../components/sw/usertypes/admin/inicioadmin/inicioadmin.component";
import { ListClientesAdminComponent } from "../components/sw/usertypes/admin/list-clientes-admin/list-clientes-admin.component";
import { EditInfoClienteAdminComponent } from "../components/sw/usertypes/admin/list-clientes-admin/edit-info-cliente-admin/edit-info-cliente-admin.component";
import { EmpresasAceptadasComponent } from "../components/sw/usertypes/admin/listEmpresas/empresas-aceptadas/empresas-aceptadas.component";
import { EmpresasEnEsperaComponent } from "../components/sw/usertypes/admin/listEmpresas/empresas-en-espera/empresas-en-espera.component";
import { ListProductosComponent } from "../components/sw/usertypes/admin/list-productos/list-productos.component";
import { DonacionesProductosAdminComponent } from "../components/sw/usertypes/admin/donaciones-productos-admin/donaciones-productos-admin.component";
import { VentasProductosAdminComponent } from "../components/sw/usertypes/admin/ventas-productos-admin/ventas-productos-admin.component";
import { DonacionesProductosAdminNOAPROBADOSComponent } from "../components/sw/usertypes/admin/donaciones-productos-admin-noaprobados/donaciones-productos-admin-noaprobados.component";
import { VentasProductosNPComponent } from "../components/sw/usertypes/admin/ventas-productos-admin/ventas-productos-np/ventas-productos-np.component";

// CLIENTE
import { ClienteComponent } from "../components/sw/usertypes/cliente/cliente.component";
import { InicioClienteComponent } from "../components/sw/usertypes/cliente/inicio-cliente/inicio-cliente.component";
import { ComprasNOPagadasClientComponent } from "../components/sw/usertypes/cliente/compras-nopagadas-client/compras-nopagadas-client.component";
import { ComprasPagadasClientComponent } from "../components/sw/usertypes/cliente/compras-pagadas-client/compras-pagadas-client.component";
import { DonacionNOPagadaClienteComponent } from "../components/sw/usertypes/cliente/donacion-nopagada-cliente/donacion-nopagada-cliente.component";
import { DonacionPagadaClienteComponent } from "../components/sw/usertypes/cliente/donacion-pagada-cliente/donacion-pagada-cliente.component";
import { PerfilClienteComponent } from "../components/sw/usertypes/cliente/perfil-cliente/perfil-cliente.component";

// EMPRESA
import { EmpresaComponent } from "../components/sw/usertypes/empresa/empresa.component";
import { InicioEmpresaComponent } from "../components/sw/usertypes/empresa/inicio-empresa/inicio-empresa.component";

// GENERAL
import { EditarinfoEmpresaComponent } from "../components/sw/usertypes/admin/listEmpresas/editarinfo-empresa/editarinfo-empresa.component";
import { VerInfoEmpresaComponent } from "../components/sw/usertypes/admin/listEmpresas/ver-info-empresa/ver-info-empresa.component";

const routes: Routes = [
  { path: "", component: SpaComponent },
  {
    path: "LogIn",
    component: LoginComponent,
  },
  {
    path: "Resgistrate",
    component: RegistrosComponent,
  },
  {
    path: "Registrate_Empresa",
    component: RegistroEmpresaComponent,
  },
  {
    path: "Registrate_Cliente",
    component: RegistroClientesComponent,
  },
  {
    path: "AdministradorCCC",
    component: AdminComponent,
    children: [
      { path: "Inicio_Administrador", component: InicioadminComponent },
      { path: "Lista_Clientes", component: ListClientesAdminComponent },
      {
        path: "EditarInformacioCliente/:id_cliente",
        component: EditInfoClienteAdminComponent,
      },
      {
        path: "EmpresasAceptadas/:status",
        component: EmpresasAceptadasComponent,
      },
      {
        path: "Empresas_EnEspera/:status",
        component: EmpresasEnEsperaComponent,
      },
      {
        path: "Informacion_Empresa/:id_empresa",
        component: VerInfoEmpresaComponent,
      },
      {
        path: "EditarInformacionEmpresa/:id_empresa",
        component: EditarinfoEmpresaComponent,
      },
      {
        path: "ListProductosComponent",
        component: ListProductosComponent,
      },
      {
        path: "Donaciones_Productos/:estatus_compra",
        component: DonacionesProductosAdminComponent,
      },
      {
        path: "Donaciones_ProductosNP/:estatus_compra",
        component: DonacionesProductosAdminNOAPROBADOSComponent,
      },
      {
        path: "Ventas_Productos/:estatus_compra",
        component: VentasProductosAdminComponent,
      },
      {
        path: "Ventas_ProductosNP/:estatus_compra",
        component: VentasProductosNPComponent,
      },
    ],
  },
  {
    path: "empresa/:id",
    component: EmpresaComponent,
    children: [{ path: "Inicio_Empresa/:id", component: InicioEmpresaComponent }],
  },
  {
    path: "cliente/:id_cliente",
    component: ClienteComponent,
    children: [
      { path: "Inicio_Cliente/:id_cliente", component: InicioClienteComponent },
      {
        path: "ComprasFinalizadas/:id_cliente",
        component: ComprasPagadasClientComponent,
      },
      {
        path: "ComprasNoFinalizadas/:id_cliente",
        component: ComprasNOPagadasClientComponent,
      },
      {
        path: "DonacionesPagadas/:id_cliente",
        component: DonacionPagadaClienteComponent,
      },
      {
        path: "DonacionesNoPagadas/:id_cliente",
        component: DonacionNOPagadaClienteComponent,
      },
      {
        path: "PerfilCliente/:id_cliente",
        component: PerfilClienteComponent,
      },
    ],
  },
];

export const APP_ROUTES = RouterModule.forRoot(routes);
