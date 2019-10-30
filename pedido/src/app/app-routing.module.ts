import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { EstadoComponent } from './estado/estado.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ProdutoComponent } from './produto/produto.component';
import { TabelaprecoComponent } from './tabelapreco/tabelapreco.component';
import { CidadeComponent } from './cidade/cidade.component';
import { VendedorComponent } from './vendedor/vendedor.component';


const routes: Routes = [
  { path: 'cliente', component: ClienteComponent },
  { path: 'vendedor', component: VendedorComponent },
  { path: 'cidade', component: CidadeComponent },
  { path: 'estado', component: EstadoComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: 'produto', component: ProdutoComponent },
  { path: 'tabelapreco', component: TabelaprecoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
