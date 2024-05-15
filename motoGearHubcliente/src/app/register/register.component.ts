// import { Component } from '@angular/core';
// import { ApiService } from '../api.service'; // Importa el servicio de la API
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent {
//   registroForm: FormGroup;

//   constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
//     this.registroForm = this.formBuilder.group({
//       // username: ['', Validators.required],
//       // password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
//       // correo: ['', [Validators.required, Validators.email]]
//       username: [''], // Se eliminaron las validaciones
//       password: [''], // Se eliminaron las validaciones
//       correo: ['']   // Se eliminaron las validaciones
//     });
//     console.log('Formulario:', this.registroForm); // Agregar esta línea aquí

//   }

//   register(): void {
//     if (this.registroForm.valid) {
//       // Realizar registro solo si el formulario es válido
//       const userData = this.registroForm.value;
//       this.apiService.register(userData).subscribe(
//         response => {
//           console.log('Usuario registrado correctamente:', response);
//           // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
//         },
//         error => {
//           console.error('Error al registrar usuario:', error);
//           // Aquí puedes mostrar un mensaje de error al usuario o manejar el error de otra manera
//         }
//       );
//     } else {
//       // El formulario no es válido, muestra mensajes de error en los campos
//       // Object.keys(this.registroForm.controls).forEach(field => {
//       //   const control = this.registroForm.get(field);
//       //   if (control) {
//       //     control.markAsTouched({ onlySelf: true });
//       //   }
//       // });
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isAdmin: boolean = false;
  registroForm!: FormGroup;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.apiService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    // Aquí se inicializa el formulario
    this.registroForm = this.formBuilder.group({
      username: [''], 
      password: [''],
      correo: [''],   
      phone: [''],
      rol: ['User'],
      nombreReal: [''],
      apellidos: [''],
      localizacion: [''],
      confirmPassword: ['']
    });
  }

  register(): void {
    const userData = {
      username: this.registroForm.value.username,
      email: this.registroForm.value.correo,
      phone: this.registroForm.value.phone,
      rol: this.registroForm.value.rol,
      nombreReal: this.registroForm.value.nombreReal,
      apellidos: this.registroForm.value.apellidos,
      localizacion: this.registroForm.value.localizacion,
      password: this.registroForm.value.password,
      confirmPassword: this.registroForm.value.confirmPassword
    };

    console.log('Datos de usuario:', userData);

    this.apiService.register(userData).subscribe(
      response => {
        console.log('Usuario registrado correctamente:', response);
        if(!this.isAdmin){
          this.router.navigate(['/login']); // Redirigir al usuario a la página de inicio de sesión
        }else{
          this.registroForm = this.formBuilder.group({
            username: [''], 
            password: [''],
            correo: [''],   
            phone: [''],
            rol: ['User'],
            nombreReal: [''],
            apellidos: [''],
            localizacion: [''],
            confirmPassword: ['']
          });
        }
      },
      error => {
        console.error('Error al registrar usuario:', error);
      }
    );
  }  
}