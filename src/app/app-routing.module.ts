import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'accueil',
    loadChildren: () =>
      import('./views/home/home.module').then((m) => m.HomeViewModule),
    data: { animation: 'HomePage' },
  },
  {
    path: 'programmes',
    loadChildren: () =>
      import('./views/programs/programs.module').then(
        (m) => m.ProgramsViewModule
      ),
    data: { animation: 'ProgramPage' },
  },
  {
    path: 'ics',
    loadChildren: () =>
      import('./views/about/about.module').then((m) => m.AboutViewModule),
    data: { animation: 'AboutPage' },
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./views/contact/contact.module').then((m) => m.ContactViewModule),
    data: { animation: 'ContactPage' },
  },
  {
    path: 'terms-of-service',
    loadChildren: () =>
      import('./views/terms-of-service/terms-of-service.module').then(
        (m) => m.TermsOfServiceViewModule
      ),
    data: { animation: 'TermsPage' },
  },
  {
    path: 'inscriptions',
    loadChildren: () =>
      import('./views/subscription/subscription.module').then(
        (m) => m.SubscriptionViewModule
      ),
    data: { animation: 'SubscriptionPage' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'profile/:userId',
    loadChildren: () =>
      import('./views/profile/profile.module').then((m) => m.ProfileViewModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'connexion',
    loadChildren: () =>
      import('./views/login/login/login.module').then((m) => m.LoginViewModule),
    data: { animation: 'LoginPage' },
  },
  {
    path: 'mot-de-passe-oublié',
    loadChildren: () =>
      import('./views/login/password-request/password-request.module').then(
        (m) => m.PasswordRequestModule
      ),
    data: { animation: 'PasswordPage' },
  },
  {
    path: 'reinitialisation-mot-de-passe/:token',
    loadChildren: () =>
      import('./views/login/password-reset/password-reset.module').then(
        (m) => m.PasswordResetModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./views/admin/admin.module').then((m) => m.AdminViewModule),
    data: { animation: 'AdminPage' },
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'admin-login',
    loadChildren: () =>
      import('./views/login/admin-login/admin-login.module').then(
        (m) => m.AdminLoginViewModule
      ),
    data: { animation: 'AdminLoginPage' },
  },
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'accueil',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AdminAuthGuard],
})
export class AppRoutingModule {}
