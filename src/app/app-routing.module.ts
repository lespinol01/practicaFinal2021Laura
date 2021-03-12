import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./componentes/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home-cine',
    loadChildren: () => import('./componentes/home-cine/home-cine.module').then( m => m.HomeCinePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./componentes/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'seleccionada/:idCartelera',
    loadChildren: () => import('./componentes/seleccionada/seleccionada.module').then( m => m.SeleccionadaPageModule)
  },
  {
    path: 'elegir-butacas/:datosPedido',
    loadChildren: () => import('./componentes/elegir-butacas/elegir-butacas.module').then( m => m.ElegirButacasPageModule)
  },
  {
    path: 'resumen-pedido/:datosPedido',
    loadChildren: () => import('./componentes/resumen-pedido/resumen-pedido.module').then( m => m.ResumenPedidoPageModule)
  },
  {
    path: 'mis-pedidos/:datosPedido',
    loadChildren: () => import('./componentes/mis-pedidos/mis-pedidos.module').then( m => m.MisPedidosPageModule)
  },
  {
    path: 'ver-mis-pedidos/:idUsuario',
    loadChildren: () => import('./componentes/ver-mis-pedidos/ver-mis-pedidos.module').then( m => m.VerMisPedidosPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
