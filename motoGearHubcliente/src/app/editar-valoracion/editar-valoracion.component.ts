import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-valoracion',
  templateUrl: './editar-valoracion.component.html',
  styleUrls: ['./editar-valoracion.component.scss']
})
export class EditarValoracionComponent implements OnInit {
  comentario: string = '';
  valoracion: number = 1; // Valoración por defecto
  userProfile: any;
  valoracionId: string | null = null;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.getValoracionDetail();
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

  getValoracionDetail(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.valoracionId = id;
      this.apiService.getValoracionById(id).subscribe(
        response => {
          const valoracionData = response.data;
          console.log('Detalles de la valoración:', valoracionData);

          this.comentario = valoracionData.comentario;
          this.valoracion = valoracionData.valoracion_numero;
        },
        error => {
          console.error('Error al obtener los detalles de la valoración:', error);
        }
      );
    } else {
      console.error('ID de la valoración no encontrado en la ruta.');
    }
  }

  editarComentario(valoracionForm: NgForm): void {
    if (valoracionForm.invalid) {
      Object.keys(valoracionForm.controls).forEach(field => {
        const control = valoracionForm.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    if (this.valoracionId !== null) {
      const comentarioEditado = {
        id_usuario: this.userProfile.id,
        valoracion_numero: this.valoracion,
        comentario: this.comentario,
        nombre_usuario: this.userProfile.name
      };

      this.apiService.updateValoracion(this.valoracionId, comentarioEditado).subscribe(
        response => {
          console.log('Comentario actualizado exitosamente:', response);
          this.router.navigate(['/producto', response.data.id_producto]);
        },
        error => {
          console.error('Error al actualizar el comentario:', error);
        }
      );
    } else {
      console.error('ID de la valoración no está disponible.');
    }
  }
}
