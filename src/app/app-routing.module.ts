import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'signalements',
    loadChildren: () => import('./pages/signalements/signalements.module').then( m => m.SignalementsPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signal-form',
    loadChildren: () => import('./pages/signal-form/signal-form.module').then( m => m.SignalFormPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'details-notif/:id',
    loadChildren: () => import('./pages/details-notif/details-notif.module').then( m => m.DetailsNotifPageModule)
  },
  {
    path: 'detail-signal/:id',
    loadChildren: () => import('./pages/detail-signal/detail-signal.module').then( m => m.DetailSignalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
