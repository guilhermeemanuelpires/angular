import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EstadoService {

  constructor(private http: HttpClient) { }

  public find(): Observable<EstadoEntity[]> {
    return this.http.get<EstadoEntity[]>(environment.urlSaaS + '/estados');
  }
}

export class EstadoEntity {
  id: number;
  nome: string;
  sigla: string;
}
