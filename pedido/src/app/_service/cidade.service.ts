import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EstadoEntity } from './estados.service';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(private http: HttpClient) { }

  public find(): Observable<CidadeEntity[]> {
    return this.http.get<CidadeEntity[]>(environment.urlSaaS + '/cidades');
  }
  
  public save(cidade: CidadeEntity) {
    if (cidade.id) {
      return this.update(cidade);
    } else {
      return this.create(cidade);
    }
  }
  public delete(id: number): Observable<CidadeEntity> {
    return this.http.delete<CidadeEntity>(environment.urlSaaS + '/cidades/' + id);
  }
  private create(cidade: CidadeEntity): Observable<CidadeEntity> {
    return this.http.post<CidadeEntity>(environment.urlSaaS + '/cidades', cidade);
  }
  private update(cidade: CidadeEntity): Observable<CidadeEntity> {
    return this.http.put<CidadeEntity>(environment.urlSaaS + '/cidades/' + cidade.id, cidade);
  }
  
}

export class CidadeEntity {
  id: number;
  nome: string;
  lat: number;
  lng: number;
  estado: EstadoEntity;
}
