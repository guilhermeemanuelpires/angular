import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente/cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ComfirmeDialogComponent } from './_components/comfirme-dialog/comfirme-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

import { AgmCoreModule } from '@agm/core';
import { MapaComponent } from './mapa/mapa.component';
import { CidadeComponent } from './cidade/cidade.component';


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ComfirmeDialogComponent,
    MapaComponent,
    CidadeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressBarModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBxvFWaaiVNM8PVowOIOD52qRu0bjVMxGQ'
    })
  ],
  providers: [],
  entryComponents: [ComfirmeDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
