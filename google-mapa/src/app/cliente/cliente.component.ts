import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService, ClienteEntity } from '../_service/cliente.service';
import { CidadeService, CidadeEntity } from '../_service/cidade.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  public displayedColumns: string[] = ['codigo', 'nome', 'email', 'cidade', 'options'];

  public clientes: ClienteEntity[] = [];
  public cidades: CidadeEntity[] = [];
  public msgerror: string;
  public loading: boolean;
  public cliente: ClienteEntity = new ClienteEntity();

  constructor(private service: ClienteService, private cidadeService: CidadeService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    // inicia variavel de controle
    this.msgerror = '';
    this.loading = true;
    //carrega dados
    this.service.find().subscribe(result => {

      this.clientes = result;

      this.cidadeService.find().subscribe(result => {
        this.cidades = result;
      }, error => {
        this.msgerror = error.message;
      });

    }, error => {
      this.msgerror = error.message;
    }).add(() => this.loading = false);
  }

  private openSidebar(cliente: ClienteEntity) {
    this.cliente = cliente;
    this.sidenav.open();
  }

  public add() {
    this.openSidebar(new ClienteEntity());
  }

  public editar(cliente: ClienteEntity) {
    this.openSidebar(cliente);
  }

  public compareOptions(id1, id2) {
    return id1 && id2 && id1.id === id2.id;
  }
  
/*  public confirmar() {
    this.loading = true;
    
    this.service.save(this.cliente).subscribe(result => {
      this.snackBar.open('Resgitro salvo com  sucesso!','',{
        duration : 300
      })
    }, error => {

    }

    ).add(() => ({
      this.loading = true;
    });
  } */

}