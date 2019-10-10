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
}

export class ClienteEntity {
  id: number;

  nome: string;

  codigo: string;

  email: string;

  cidade: CidadeEntity;
}