import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  public find(): Observable<PordutoEntity[]> {
    return this.http.get<PordutoEntity[]>(environment.urlSaaS + '/produtos');
  }

  public save(produto: PordutoEntity) {
    if (produto.id) {
      return this.update(produto);
    } else {
      return this.create(produto);
    }
  }
  public delete(id: number): Observable<PordutoEntity> {
    return this.http.delete<PordutoEntity>(environment.urlSaaS + '/produtos/' + id);
  }
  private create(produto: PordutoEntity): Observable<PordutoEntity> {
    return this.http.post<PordutoEntity>(environment.urlSaaS + '/produtos', produto);
  }
  private update(produto: PordutoEntity): Observable<PordutoEntity> {
    return this.http.put<PordutoEntity>(environment.urlSaaS + '/produtos/' + produto.id, produto);
  }
}


export class PordutoEntity {
  id: number;
  codigo: string;
  nome: string;
  descricao: string;
  preco: number;
}