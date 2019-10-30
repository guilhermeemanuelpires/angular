import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { PordutoEntity, ProdutoService } from '../_service/produto.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogModel, ComfirmeDialogComponent } from '../_components/comfirme-dialog/comfirme-dialog.component';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  public displayedColumns: string[] = ['codigo', 'nome', 'descricao', 'preco', 'options'];

  public produtos: PordutoEntity[] = [];

  public produto: PordutoEntity = new PordutoEntity();

  public msgerror: string;
  public loading: boolean;

  constructor(private service: ProdutoService,
    private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  ngOnInit() {
    //Inicia variaveis de controle
    this.msgerror = '';
    this.loading = true;

    //Carrega dados
    this.service.find().subscribe(result => {

      this.produtos = result;
      this.loading = false;

    }, error => {
      this.msgerror = error.message;
    }).add(() => this.loading = false);
  }

  private openSidebar(produto: PordutoEntity) {
    this.produto = produto;

    this.sidenav.open();
  }
  public add() {
    this.openSidebar(new PordutoEntity());
  }
  public editar(produto: PordutoEntity): void {
    this.openSidebar(produto);
  }

  public excluir(produto: PordutoEntity): void {

    const dialogRef = this.dialog.open(ComfirmeDialogComponent, {
      width: '400px',
      data: new ConfirmDialogModel('Excluir Registro', 'Deseja realemente excluir o registro?')
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = false;

        this.service.delete(produto.id).subscribe(result => {
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

    this.service.save(this.produto).subscribe(result => {
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
