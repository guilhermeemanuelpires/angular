import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CidadeEntity } from 'src/app/_service/cidade.service';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  public find(): Observable<ClienteEntity[]> {

    return this.http.get<ClienteEntity[]>(environment.urlSaaS + '/clientes')
  }

  public save(cliente: ClienteEntity) {
    if (cliente.id) {
      return this.update(cliente);
    } else {
      return this.create(cliente);
    }
  }

  public delete(id: number): Observable<ClienteEntity> {
    return this.http.delete<ClienteEntity>(environment.urlSaaS + '/clientes/' + id);
  }

  private create(cliente: ClienteEntity): Observable<ClienteEntity> {
    return this.http.post<ClienteEntity>(environment.urlSaaS + '/clientes', cliente);
  }

  private update(cliente: ClienteEntity): Observable<ClienteEntity> {
    return this.http.put<ClienteEntity>(environment.urlSaaS + '/clientes/' + cliente.id, cliente);
  }

}

export class ClienteEntity {
  id: number;

  nome: string;

  codigo: string;

  email: string;

  cidade: CidadeEntity;
}