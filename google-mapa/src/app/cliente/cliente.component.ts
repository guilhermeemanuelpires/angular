import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService, ClienteEntity } from '../_service/cliente.service';
import { CidadeService, CidadeEntity } from '../_service/cidade.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ComfirmeDialogComponent } from '../_components/comfirme-dialog/comfirme-dialog.component';


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

  constructor(private service: ClienteService,
    private cidadeService: CidadeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

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

  public excluir(cliente: ClienteEntity) {

    const dialogRef = this.dialog.open(ComfirmeDialogComponent, {
      width: 'p400x',
      data: new ConfirmDialogModel('Excluir', 'Deseja realmente excluir este registro?')
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //T'O-DO'
        this.loading = false;
        this.service.delete(cliente.id).subscribe(result => {

        }, error => {
          this.msgerror = error.message;
        }).add(() => {
          this.loading = true;
        });

      }
    });
  }

  public compareOptions(id1, id2) {
    return id1 && id2 && id1.id === id2.id;
  }

  public confirmar() {
    this.loading = true;

    this.service.save(this.cliente).subscribe(result => {
      this.snackBar.open('Resgitro salvo com  sucesso!', '', {
        duration: 300
      })
    }, error => {
      this.msgerror = error.message;
    }).add(() => {
      this.sidenav.close();
      this.loading = true;
    });
  }

}