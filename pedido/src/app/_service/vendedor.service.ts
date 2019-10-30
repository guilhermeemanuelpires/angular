import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CidadeEntity } from './cidade.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  constructor(private http: HttpClient) { }

  public find(): Observable<VendedorEntity[]> {
    return this.http.get<VendedorEntity[]>(environment.urlSaaS + '/vendedores')
  }

  public save(vendedor: VendedorEntity) {
    if (vendedor.id) {
      return this.update(vendedor);
    } else {
      return this.create(vendedor);
    }
  }

  public delete(id: number): Observable<VendedorEntity> {
    return this.http.delete<VendedorEntity>(environment.urlSaaS + '/vendedores/' + id);
  }

  private create(vendedor: VendedorEntity): Observable<VendedorEntity> {
    return this.http.post<VendedorEntity>(environment.urlSaaS + '/vendedores', vendedor);
  }

  private update(vendedor: VendedorEntity): Observable<VendedorEntity> {
    return this.http.put<VendedorEntity>(environment.urlSaaS + '/vendedores/' + vendedor.id, vendedor);
  }

}

export class VendedorEntity {

  id: number;
  codigo: string;
  nome: string;
  email: string;
  cidade: CidadeEntity;

}
