import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedComponent } from './components/protected.component';
import { UnprotectedComponent } from './components/unprotected.component';
import { ChildRouteComponent } from './components/child-route.component';
import { NestedChildRouteComponent } from './components/nested-child-route.component';
import { ErrorComponent } from './components/error.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    component: UnprotectedComponent,
    pathMatch: 'full',
  },
  {
    path: 'child',
    component: ChildRouteComponent,
    canActivateChild: [AuthGuard],
    children: [{ path: 'nested', component: NestedChildRouteComponent }],
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'lazy',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./lazy-module.module').then((m) => m.LazyModuleModule),
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
