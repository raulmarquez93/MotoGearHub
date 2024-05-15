import { Component,OnInit  } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

    constructor(private apiService: ApiService, private router: Router) { }

  

    logout(): void {
      this.apiService.logout().subscribe(
        response => {
          console.log('Logout exitoso:', response);
          // Limpiar las cookies u otras tareas de logout
          this.router.navigate(['/login']); // Redirigir al usuario a la página de inicio de sesión u otra página
        },
        error => {
          console.error('Error al realizar logout:', error);
          // Manejar el error de logout
        }
      );
    }
}
