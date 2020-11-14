import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'accueil',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeViewModule)
  },
  {
    path: 'programmes',
    loadChildren: () => import('./views/programs/programs.module').then(m => m.ProgramsViewModule)
  },
  {
    path: 'ics',
    loadChildren: () => import('./views/about/about.module').then(m => m.AboutViewModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./views/contact/contact.module').then(m => m.ContactViewModule)
  },
  {
    path: 'terms-of-service',
    loadChildren: () => import('./views/terms-of-service/terms-of-service.module').then(m => m.TermsOfServiceViewModule)
  },
  {
    path: 'inscriptions',
    loadChildren: () => import('./views/subscription/subscription.module').then(m => m.SubscriptionViewModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'profile/:userId',
    loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileViewModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'connexion',
    loadChildren: () => import('./views/login/login/login.module').then(m => m.LoginViewModule)
  },
  {
    path: 'mot-de-passe-oublié',
    loadChildren: () => import('./views/login/password-request/password-request.module').then(m => m.PasswordRequestModule)
  },
  {
    path: 'reinitialisation-mot-de-passe/:token',
    loadChildren: () => import('./views/login/password-reset/password-reset.module').then(m => m.PasswordResetModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminViewModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin-login',
    loadChildren: () => import('./views/login/admin-login/admin-login.module').then(m => m.AdminLoginViewModule)
  },
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'accueil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [AuthGuard, AdminAuthGuard]
})
export class AppRoutingModule { }
