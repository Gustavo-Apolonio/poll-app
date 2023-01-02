import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard, MainGuard } from './core/guards';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/index').then((m) => m.LoginPageComponentModule),
    canActivate: [LoginGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/index').then((m) => m.MainPageComponentModule),
    canActivate: [MainGuard],
  },
  { path: '***', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
