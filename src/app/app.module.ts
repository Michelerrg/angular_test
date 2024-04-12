import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProvaComponent } from './prova/prova.component';
import { AppShellComponent } from './app-shell/app-shell.component';
import { HomeComponent } from './home/home.component';
import { FooterAppComponent } from './footer-app/footer-app.component';
import { ListComponent } from './list/list.component';
import { CodiceFiscaleComponent } from './codice-fiscale/codice-fiscale.component';

@NgModule({
  declarations: [
    AppComponent,
    ProvaComponent,
    AppShellComponent,
    HomeComponent,
    FooterAppComponent,
    ListComponent,
    CodiceFiscaleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
