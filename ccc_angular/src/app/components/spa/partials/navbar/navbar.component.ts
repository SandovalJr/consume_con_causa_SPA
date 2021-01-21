import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }
  public EmpresaRegistro() {
    this.router.navigateByUrl(`/Registrate_Empresa`);
  }

  public RegistroCliente() {
    this.router.navigateByUrl(`/Registrate_Cliente`);
  }
}
