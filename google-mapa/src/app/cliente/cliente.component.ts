import { Component, OnInit } from '@angular/core';
import { ClienteService, ClienteEntity } from '../_service/cliente.service';
import { CidadeService, CidadeEntity } from '../_service/cidade.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public displayedColumns: string[] = ['codigo', 'nome', 'email', 'cidade', 'options'];

  public clientes: ClienteEntity[] = [];
  public cidades: CidadeEntity[] = [];

  constructor(private service: ClienteService, private cidadeService: CidadeService) { }

  ngOnInit() {

    this.service.find().subscribe(result => {

      this.clientes = result;

      this.cidadeService.find().subscribe(result => {
        this.cidades = result;
      }, error => {
        console.error('Pau', error);
      });

    }, error => {
      console.error('Pau', error);
    });
  }

}