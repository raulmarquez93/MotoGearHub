// import { Component } from '@angular/core';
// import { ApiService } from '../api.service';
// import { OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router'; // Import the ActivatedRoute module
// import { Router } from '@angular/router'; // Import the Router module
// @Component({
//   selector: 'app-crear-valoracion',
//   templateUrl: './crear-valoracion.component.html',
//   styleUrl: './crear-valoracion.component.scss'
// })
// export class CrearValoracionComponent implements OnInit{
//   comentario: string = '';
//   valoracion: number = 1; // Valoración por defecto
//   userProfile: any;
//   constructor(private apiService: ApiService ,private route: ActivatedRoute,private router: Router )  {}
// ngOnInit(): void {
//   this.getUserProfile();
// }
// getUserProfile(): void {
//   this.apiService.getUserProfile().subscribe(
//     response => {
//       this.userProfile = response.data;
//     },
//     error => {
//       console.error('Error al obtener perfil de usuario:', error);
//     }
//   );
// }

//   crearComentario(): void {
//     const id = this.route.snapshot.paramMap.get('idproducto');
//     console.log(id);  
//     const nuevoComentario = {
//       id_usuario: this.userProfile.id, 
//       id_producto: id,
//       valoracion_numero: this.valoracion,
//       comentario: this.comentario,
//       nombre_usuario: this.userProfile.name
//     };

//     // Llamada al método del servicio API para crear el comentario
//     this.apiService.createValoracion(nuevoComentario).subscribe(
//       response => {
//         console.log('Comentario creado exitosamente:', response);
//         // Redirige al usuario a la página de detalles del producto
//         this.router.navigate(['/producto', id]);
//       },
//       error => {
//         console.error('Error al crear el comentario:', error);
//         // Aquí podrías mostrar un mensaje de error al usuario
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crear-valoracion',
  templateUrl: './crear-valoracion.component.html',
  styleUrls: ['./crear-valoracion.component.scss']
})
export class CrearValoracionComponent implements OnInit {
  comentario: string = '';
  valoracion: number = 1; // Valoración por defecto
  userProfile: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.apiService.getUserProfile().subscribe(
      response => {
        this.userProfile = response.data;
      },
      error => {
        console.error('Error al obtener perfil de usuario:', error);
      }
    );
  }

  crearComentario(valoracionForm: NgForm): void {
    if (valoracionForm.invalid) {
      // Marcar todos los controles como tocados para que se muestren los mensajes de error
      Object.keys(valoracionForm.controls).forEach(field => {
        const control = valoracionForm.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    const id = this.route.snapshot.paramMap.get('idproducto');
    const nuevoComentario = {
      id_usuario: this.userProfile.id,
      id_producto: id,
      valoracion_numero: this.valoracion,
      comentario: this.comentario,
      nombre_usuario: this.userProfile.name
    };

    this.apiService.createValoracion(nuevoComentario).subscribe(
      response => {
        console.log('Comentario creado exitosamente:', response);
        this.router.navigate(['/producto', id]);
      },
      error => {
        console.error('Error al crear el comentario:', error);
      }
    );
  }
}

