import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'accueil',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeViewModule)
  },
  {
    path: 'programs',
    loadChildren: () => import('./views/programs/programs.module').then(m => m.ProgramsViewModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./views/about/about.module').then(m => m.AboutViewModule)
  },
  // {
  //   path: 'media',
  //   loadChildren: () => import('./views/media/media.module').then(m => m.MediaViewModule)
  // },
  {
    path: 'contact',
    loadChildren: () => import('./views/contact/contact.module').then(m => m.ContactViewModule)
  },
  {
    path: 'terms-of-service',
    loadChildren: () => import('./views/terms-of-service/terms-of-service.module').then(m => m.TermsOfServiceViewModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./views/subscription/subscription.module').then(m => m.SubscriptionViewModule)
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
  providers: []
})
export class AppRoutingModule { }
