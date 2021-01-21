import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { Routes, Router } from "@angular/router";
@Component({
  selector: 'app-sidenav-empresa',
  templateUrl: './sidenav-empresa.component.html',
  styleUrls: ['./sidenav-empresa.component.scss']
})
export class SidenavEmpresaComponent implements OnInit {

  mobileQuery: MediaQueryList;
  fillerNav = [
    {
      name: "Inicio",
      route: "/AdministradorCCC/Inicio_Administrador",
      icon: "home",
    },
  ];
  private _mobileQueryListener: () => void;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  shouldRun = true;
  ngOnInit(): void {}
}
