import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  base_url=`${environment.URL_API}/heroes`;

  constructor(private http:HttpClient) { }

  getHeores():Observable<Heroe[]>{
    return this.http.get<Heroe[]>(this.base_url)
  }
  getHeroePorId(id:string):Observable<Heroe>{
    return this.http.get<Heroe>(`${this.base_url}/${id}`)
  }
  getSugerencias(termino:string):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.base_url}?q=${termino}&_limit=6`);
  }
  agregarHeroe(heroe:Heroe):Observable<Heroe>{
    return this.http.post<Heroe>(this.base_url,heroe);
  }
  actualizarHeroe(heroe:Heroe):Observable<Heroe>{
    return this.http.put<Heroe>(`${this.base_url}/${heroe.id}`,heroe);
  }
  borrarHeroe(id:string):Observable<{}>{
    return this.http.delete<{}>(`${this.base_url}/${id}`);
  }
}
