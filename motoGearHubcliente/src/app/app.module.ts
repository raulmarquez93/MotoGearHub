import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'; // Importa LoginComponent aquí
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { ApiService } from './api.service'; // Importa el servicio de la API
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { AppRoutingModule } from './app-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoItemComponent } from './producto-item/producto-item.component';
import { ProductoCreateComponent } from './producto-create/producto-create.component';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { CestaComponent } from './cesta/cesta.component';
import { CrearValoracionComponent } from './crear-valoracion/crear-valoracion.component';
import { EditarValoracionComponent } from './editar-valoracion/editar-valoracion.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    LogoutComponent,
    UserProfileComponent,
    ProductosComponent,
    ProductoItemComponent,
    ProductoCreateComponent,
    ProductoEditComponent,
    UsuariosListComponent,
    CestaComponent,
    CrearValoracionComponent,
    EditarValoracionComponent,
    PublicacionesComponent 

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
