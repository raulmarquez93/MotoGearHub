import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductoItemComponent } from './producto-item/producto-item.component';
import { ProductoCreateComponent } from './producto-create/producto-create.component';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { CestaComponent } from './cesta/cesta.component';
import { CrearValoracionComponent } from './crear-valoracion/crear-valoracion.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { EditarValoracionComponent } from './editar-valoracion/editar-valoracion.component';
const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'home', component: HomeComponent },
    { path: 'publicaciones', component: PublicacionesComponent},

    { path: 'register', component: RegisterComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'producto/:id', component: ProductoItemComponent},
    { path: 'producto-edit/:id', component: ProductoEditComponent},
    { path: 'nuevoProducto', component: ProductoCreateComponent},
    { path: 'cesta', component: CestaComponent},
    { path: 'crear-valoracion/:idproducto', component: CrearValoracionComponent},
    { path: 'editar-valoracion/:id', component: EditarValoracionComponent},
    { path: 'usuarios-lista', component: UsuariosListComponent},
    { path: '**', redirectTo: '/home' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
