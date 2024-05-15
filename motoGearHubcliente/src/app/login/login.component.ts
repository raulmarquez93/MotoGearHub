import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService,private router: Router) {}

  login(): void {
    this.apiService.login(this.email, this.password).subscribe(
      response => {
        // Manejar la respuesta del servidor aquí
        this.apiService.handleLoginResponse(response);
        this.router.navigate(['/home']);
        console.log(response);
      },
      error => {
        // Manejar errores aquí
         // Si hay un error en el inicio de sesión, mostrar el mensaje de error proporcionado por el servidor
         if (error instanceof HttpErrorResponse && error.error && error.error.msg) {
          this.errorMessage = error.error.msg;
        } else {
          this.errorMessage = 'Error en el inicio de sesión';
        }
        console.error(error);
      }
    );
  }
}
