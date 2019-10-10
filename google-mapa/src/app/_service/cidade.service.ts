import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(private http: HttpClient) { }

  public find(): Observable<CidadeEntity[]> {

    return this.http.get<CidadeEntity[]>(environment.urlSaaS + '/cidades')

  }
}

export class EstadoEntity {

  id: number;

  nome: string;

  sigla: string;

}

export class CidadeEntity {

  id: number;

  nome: string;

  lat: number;

  lng: number;

  estado: EstadoEntity;

}