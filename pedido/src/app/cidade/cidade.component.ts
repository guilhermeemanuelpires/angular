import { Component, OnInit, ViewChild } from '@angular/core';
import { CidadeEntity, CidadeService } from '../_service/cidade.service';
import { EstadoEntity, EstadosService } from '../_service/estados.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComfirmeDialogComponent, ConfirmDialogModel } from '../_components/comfirme-dialog/comfirme-dialog.component';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.scss']
})
export class CidadeComponent implements OnInit {

  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  public displayedColumns: string[] = ['nome', 'estado', 'lat', 'lng', 'options'];

  public cidades: CidadeEntity[] = [];
  public estados: EstadoEntity[] = [];

  public cidade: CidadeEntity = new CidadeEntity();

  public msgerror: string;
  public loading: boolean;

  constructor(private service: CidadeService, private estadoService: EstadosService,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    //Inicia variaveis de controle
    this.msgerror = '';
    this.loading = true;

    //Carrega dados
    this.service.find().subscribe(result => {

      this.cidades = result;

      this.estadoService.find().subscribe(result => {

        this.estados = result;

        this.loading = false;

      }, error => {
        this.msgerror = error.message;
      });

    }, error => {
      this.msgerror = error.message;
    }).add(() => this.loading = false);
  }

  private openSidebar(cidade: CidadeEntity) {
    this.cidade = cidade;

    this.sidenav.open();
  }
  public add() {
    this.openSidebar(new CidadeEntity());
  }
  public editar(cidade: CidadeEntity): void {
    this.openSidebar(cidade);
  }

  public excluir(cidade: CidadeEntity): void {

    const dialogRef = this.dialog.open(ComfirmeDialogComponent, {
      width: '400px',
      data: new ConfirmDialogModel('Excluir Registro', 'Deseja realemente excluir o registro?')
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = false;

        this.service.delete(cidade.id).subscribe(result => {
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

    this.service.save(this.cidade).subscribe(result => {
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
