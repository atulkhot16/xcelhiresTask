import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Authguard } from './shared/services/authguard.service';

const routes: Routes = [
  { path : '', pathMatch : 'full', redirectTo : 'logIn' },
  { path : 'logIn', loadChildren : ()=>{return import('./log-in/log-in.module').then((module : any)=>{ return module.LogInModule})}},
  { path : 'dashboard', loadChildren : ()=>{ return import('./dashboard/dashboard.module').then((module : any)=>{ return module.DashboardModule})} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
