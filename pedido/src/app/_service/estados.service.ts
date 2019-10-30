import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EstadosService {

  constructor(private http: HttpClient) { }

  public find(): Observable<EstadoEntity[]> {
    return this.http.get<EstadoEntity[]>(environment.urlSaaS + '/estados');
  }

  public save(estado: EstadoEntity) {
    if (estado.id) {
      return this.update(estado);
    } else {
      return this.create(estado);
    }
  }
  public delete(id: number): Observable<EstadoEntity> {
    return this.http.delete<EstadoEntity>(environment.urlSaaS + '/estados/' + id);
  }
  private create(estado: EstadoEntity): Observable<EstadoEntity> {
    return this.http.post<EstadoEntity>(environment.urlSaaS + '/estados', estado);
  }
  private update(estado: EstadoEntity): Observable<EstadoEntity> {
    return this.http.put<EstadoEntity>(environment.urlSaaS + '/estados/' + estado.id, estado);
  }

}

export class EstadoEntity {
  id: number;
  nome: string;
  sigla: string;
}