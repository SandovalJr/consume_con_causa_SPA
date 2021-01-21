import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  baseUrl = "http://localhost:3000/api/upload";

  constructor(private http: HttpClient, private router: Router) { }

  public AddImage(Imagen: File, tipoImg: "empresa"|"producto", id: any){
    console.log("Servicio Imagen");

    const formData = new FormData();
    formData.append('imagen', Imagen);

    console.log('Imagen');

    return this.http.put(
      `${this.baseUrl}/${tipoImg}/${id}`,
      formData
    )

  }
}
