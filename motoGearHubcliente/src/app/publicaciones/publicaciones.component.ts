import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; // Replace 'path/to/publicaciones.service' with the actual path to the PublicacionesService file
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrl: './publicaciones.component.scss'
})
export class PublicacionesComponent implements OnInit {
  publicaciones: any[] = [];
  usuarios: any[] = [];
  newPublicacion: any = {
    id_producto: "",
    Descripcion: '',
    imagen: 'imagen'

  };
  newComentario: any = {
    publicacion_id: null,
    usuario_id: null,
    nombre: '',
    comentario: ''
  };
  editPublicacion: any = {
    id_producto: null,
    Descripcion: '',
    imagen: 'imagen'

  };
  showForm: any;
  imagenBase64: string = "";
  userProfile: any = {};
  productos: any;
  isAdmin: boolean = false;
  haCreadoPublicacion: any;

  constructor(private publicacionesService: ApiService) { }

  ngOnInit(): void {
    this.getUserProfile();

    this.obtenerUsuarios();
    this.obtenerProductos();

    this.cancelEdit();

  }
  getUserProfile(): void {
    this.publicacionesService.getUserProfile().subscribe(
      response => {
        this.userProfile = response.data;
        this.newPublicacion.id_usuario = this.userProfile.id;
        this.publicacionesService.isAdmin().subscribe(isAdmin => {
          this.isAdmin = isAdmin;
        });
        this.loadPublicaciones();

      },
      error => {
        console.error('Error al obtener perfil de usuario:', error);
      }
    );
  }
  obtenerProductos(): void {
    this.publicacionesService.getProductos().subscribe(
      (response) => {
        // Asigna la lista de productos al arreglo productos
        this.productos = response.data;

      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
  obtenerUsuarios(): void {
    this.publicacionesService.getUsersList().subscribe(
      response => {
        this.usuarios = response.data;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  loadPublicaciones(): void {
    this.publicacionesService.getPublicaciones().subscribe(
      data => {
        this.publicaciones = data.map((publicacion: any) => { 
          publicacion.usuario = this.usuarios ? this.usuarios.find(usuario => usuario.id === publicacion.id_usuario) : null;

        publicacion.propietario =  publicacion.id_usuario ===  this.userProfile.id;
        publicacion.showComments = false;
        publicacion.nuevoComentario = '';
        publicacion.comentarios = [];
        console.log(this.userProfile.id);
        console.log(publicacion.id_usuario);
        console.log(this.userProfile.id);
          return publicacion;
        });

      },
      error => {
        console.error('Error al cargar publicaciones:', error);
      }
    );
  }
  
  addPublicacion(form: NgForm): void {
    if (form.invalid || !this.imagenBase64) {
      form.controls['imagen'].setErrors({'required': true});
      return; // No submit the form if it is invalid or the image is not selected
    }
    if (this.imagenBase64) {
      this.newPublicacion.imagen = this.imagenBase64;
    }
    this.publicacionesService.addPublicacion(this.newPublicacion).subscribe(data => {
      this.publicaciones.push(data);
      this.newPublicacion = {
        Descripcion: '',
         imagen: "imagen",
      };
      form.resetForm();
      this.loadPublicaciones(); // Reset the form after successful submission
    });
  }
  // addPublicacion(): void {
  //   if (this.imagenBase64) {
  //     this.newPublicacion.imagen = this.imagenBase64;
  //   }
  //   console.log(this.newPublicacion);
  //   this.publicacionesService.addPublicacion(this.newPublicacion).subscribe(data => {
  //     this.publicaciones.push(data);
  //     this.newPublicacion = {
  //       Descripcion: this.newPublicacion.Descripcion,
  //       imagen: this.newPublicacion.imagen
  //     };

  //   });
  // }

  edit(publicacion: any): void {
    this.editPublicacion = { ...publicacion };
    this.imagenBase64 = this.editPublicacion.imagen; // Load the current image
  }
  cancelEdit(): void {
    this.editPublicacion = null;
    this.imagenBase64 = '';
  }

  // updatePublicacion(): void {
  //   if (this.imagenBase64) {
  //     this.editPublicacion.imagen = this.imagenBase64;
  //   }
  //   console.log(this.editPublicacion);
  //   this.publicacionesService.updatePublicacion(this.editPublicacion.id, this.editPublicacion).subscribe(
  //     () => {
  //       this.loadPublicaciones();
  //       this.editPublicacion = null;
  //     },
  //     error => {
  //       console.error('Error al actualizar publicación:', error);
  //     }
  //   );
  // }  
  updatePublicacion(form: NgForm): void {
    if (form.invalid || !this.imagenBase64) {
      form.controls['imagen'].setErrors({'required': true});
      return; // No submit the form if it is invalid or the image is not selected
    }
    if (this.imagenBase64) {
      this.editPublicacion.imagen = this.imagenBase64;
    }
    this.publicacionesService.updatePublicacion(this.editPublicacion.id, this.editPublicacion).subscribe(
      () => {
        this.loadPublicaciones();
        this.editPublicacion = null;
        this.imagenBase64 = ''; // Clear the image after update
      },
      error => {
        console.error('Error al actualizar publicación:', error);
      }
    );
  }

  

  deletePublicacion(id: number): void {
    this.publicacionesService.deletePublicacion(id).subscribe(() => {
      this.loadPublicaciones();
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0]; // Obtener el primer archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagenBase64 = reader.result as string; // Almacenar la imagen en formato Base64 en la variable imagenBase64
      };
    }
  }
  loadComentarios(publicacionId: number): void {
    this.publicacionesService.getComentarios().subscribe(
      data => {
        const comentariosFiltrados = data.filter((comentario: any) => comentario.publicacion_id === publicacionId);
        const publicacion = this.publicaciones.find(p => p.id === publicacionId);
        if (publicacion) {
          publicacion.comentarios = comentariosFiltrados.map((comentario: any) => {
            comentario.propietario = comentario.usuario_id === this.userProfile.id;
            return comentario;
          });
        }
      },
      error => {
        console.error('Error al cargar comentarios:', error);
      }
    );
  }
  addComentario(publicacionId: number, form: NgForm): void {
    if (form.invalid) {
      return; // No submit the form if it is invalid
    }
    this.newComentario.nombre = this.userProfile.name;
    this.newComentario.publicacion_id = publicacionId;
    this.newComentario.usuario_id = this.userProfile.id;
    this.publicacionesService.addComentario(this.newComentario).subscribe(data => {
      this.loadComentarios(publicacionId);
      this.newComentario = {
        publicacion_id: null,
        usuario_id: null,
        nombre: '',
        comentario: ''
      };
      form.resetForm(); // Reset the form after successful submission
    });
  }
  // addComentario(publicacionId: number): void {
  //   this.newComentario.nombre = this.userProfile.name;
  //   this.newComentario.publicacion_id = publicacionId;
  //   this.newComentario.usuario_id = this.userProfile.id;
  //   this.publicacionesService.addComentario(this.newComentario).subscribe(data => {
  //     this.loadComentarios(publicacionId);
  //     this.newComentario = {
  //       publicacion_id: null,
  //       usuario_id: null,
  //       nombre: '',
  //       comentario: ''
  //     };
  //   });
  // }
  deleteComentario( publicacionId:number, comentarioId: number): void {
    this.publicacionesService.deleteComentario(comentarioId).subscribe(
      response => {
        console.log('Comentario eliminado correctamente');
        this.loadComentarios(publicacionId);
      },
      error => {
        console.error('Error al eliminar comentario:', error);
      }
    );
  }
// publicaciones.component.ts

toggleComments(publicacion: any): void {
  publicacion.showComments = !publicacion.showComments;
  if (publicacion.showComments) {
    this.loadComentarios(publicacion.id);
  }
}

  // toggleComments(publicacion: any): void {
  //   publicacion.showComments = !publicacion.showComments;
  //   if (publicacion.showComments && publicacion.comentarios.length === 0) {
  //     this.loadComentarios(publicacion);
  //   }
  // }

  // loadComentarios(publicacion: any): void {
  //   this.publicacionesService.getComentarios(publicacion.id).subscribe(
  //     data => {
  //       publicacion.comentarios = data;
  //     },
  //     error => {
  //       console.error('Error al cargar comentarios:', error);
  //     }
  //   );
  // }

  // addComentario(publicacion: any): void {
  //   const comentarioData = {
  //     id_usuario: this.userProfile.id,
  //     id_publicacion: publicacion.id,
  //     texto: publicacion.nuevoComentario
  //   };
  //   this.publicacionesService.addComentario(comentarioData).subscribe(() => {
  //     this.loadComentarios(publicacion);
  //     publicacion.nuevoComentario = '';
  //   });
  // }
}
