import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { EstadosService, EstadoEntity } from '../_service/estados.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ComfirmeDialogComponent, ConfirmDialogModel } from '../_components/comfirme-dialog/comfirme-dialog.component';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.scss']
})
export class EstadoComponent implements OnInit {

  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  public displayedColumns: string[] = ['nome', 'sigla', 'options'];

  public estados: EstadoEntity[] = [];

  public estado: EstadoEntity = new EstadoEntity();

  public msgerror: string;
  public loading: boolean;

  constructor(private service: EstadosService,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    //Inicia variaveis de controle
    this.msgerror = '';
    this.loading = true;

    //Carrega dados
    this.service.find().subscribe(result => {

      this.estados = result;
      this.loading = false;

    }, error => {
      this.msgerror = error.message;
    }).add(() => this.loading = false);
  }

  private openSidebar(estado: EstadoEntity) {
    this.estado = estado;

    this.sidenav.open();
  }
  public add() {
    this.openSidebar(new EstadoEntity());
  }
  public editar(estado: EstadoEntity): void {
    this.openSidebar(estado);
  }

  public excluir(estado: EstadoEntity): void {

    const dialogRef = this.dialog.open(ComfirmeDialogComponent, {
      width: '400px',
      data: new ConfirmDialogModel('Excluir Registro', 'Deseja realemente excluir o registro?')
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = false;

        this.service.delete(estado.id).subscribe(result => {
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

    this.service.save(this.estado).subscribe(result => {
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
