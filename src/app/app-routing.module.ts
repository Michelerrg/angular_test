import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppShellComponent } from './app-shell/app-shell.component';
import { ProvaComponent } from './prova/prova.component';
import { ListComponent } from './list/list.component';
import { FooterAppComponent } from './footer-app/footer-app.component';
import { CodiceFiscaleComponent } from './codice-fiscale/codice-fiscale.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'prova', component: ProvaComponent },
  { path: 'list', component: ListComponent },
  { path: 'codice-fiscale', component: CodiceFiscaleComponent },
  { path: 'app-shell', component: AppShellComponent },
  { path: 'footer-app', component: FooterAppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
