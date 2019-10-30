import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { VendedorEntity, VendedorService } from '../_service/vendedor.service';
import { CidadeEntity, CidadeService } from '../_service/cidade.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ComfirmeDialogComponent, ConfirmDialogModel } from '../_components/comfirme-dialog/comfirme-dialog.component';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.scss']
})
export class VendedorComponent implements OnInit {

  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  public displayedColumns: string[] = ['codigo', 'nome', 'email', 'cidade', 'options'];

  public vendedores: VendedorEntity[] = [];
  public cidades: CidadeEntity[] = [];

  public vendedor: VendedorEntity = new VendedorEntity();

  public msgerror: string;
  public loading: boolean;
  
  constructor(private service: VendedorService, private vendedorService: CidadeService,
    private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  ngOnInit() {
    //Inicia variaveis de controle
    this.msgerror = '';
    this.loading = true;

    //Carrega dados
    this.service.find().subscribe(result => {

      this.vendedores = result;

      this.vendedorService.find().subscribe(result => {

        this.cidades = result;

        this.loading = false;

      }, error => {
        this.msgerror = error.message;
      });

    }, error => {
      this.msgerror = error.message;
    }).add(() => this.loading = false);
  }

  private openSidebar(vendedor: VendedorEntity) {
    this.vendedor = vendedor;

    this.sidenav.open();
  }
  public add() {
    this.openSidebar(new VendedorEntity());
  }
  public editar(vendedor: VendedorEntity): void {
    this.openSidebar(vendedor);
  }

  public excluir(vendedor: VendedorEntity): void {

    const dialogRef = this.dialog.open(ComfirmeDialogComponent, {
      width: '400px',
      data: new ConfirmDialogModel('Excluir Registro', 'Deseja realemente excluir o registro?')
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = false;

        this.service.delete(vendedor.id).subscribe(result => {
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

    this.service.save(this.vendedor).subscribe(result => {
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
