import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ClienteEntity, ClienteService } from '../_service/cliente.service';
import { CidadeEntity, CidadeService } from '../_service/cidade.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComfirmeDialogComponent, ConfirmDialogModel } from '../_components/comfirme-dialog/comfirme-dialog.component';

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

  public cliente: ClienteEntity = new ClienteEntity();

  public msgerror: string;
  public loading: boolean;

  constructor(private service: ClienteService, private cidadeService: CidadeService,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    //Inicia variaveis de controle
    this.msgerror = '';
    this.loading = true;

    //Carrega dados
    this.service.find().subscribe(result => {

      this.clientes = result;

      this.cidadeService.find().subscribe(result => {

        this.cidades = result;

        this.loading = false;

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
  public editar(cliente: ClienteEntity): void {
    this.openSidebar(cliente);
  }

  public excluir(cliente: ClienteEntity): void {

    const dialogRef = this.dialog.open(ComfirmeDialogComponent, {
      width: '400px',
      data: new ConfirmDialogModel('Excluir Registro', 'Deseja realemente excluir o registro?')
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = false;

        this.service.delete(cliente.id).subscribe(result => {
          this.snackBar.open('Registro excluído com sucesso!', '', {
            duration: 3000
          });
        }, error => {
          this.msgerror = error.message;
        }).add(() => {
          this.loading = false;
        });

      }
    });

  }

  public confirmar(): void {
    this.loading = true;

    this.service.save(this.cliente).subscribe(result => {
      this.snackBar.open('Registro salvo com sucesso!', '', {
        duration: 3000
      });
    }, error => {
      this.msgerror = error.message;
    }).add(() => {
      this.sidenav.close();

      this.loading = false;
    });
  }

  public compareOptions(id1, id2) {
    return id1 && id2 && id1.id === id2.id;
  }

}
