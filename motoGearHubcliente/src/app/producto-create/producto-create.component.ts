import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms'; // Importa NgForm
@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrl: './producto-create.component.scss'
})
export class ProductoCreateComponent {
  nombre: string = '';
  descripcion: string = '';
  precio: number = 0;
  stock: number = 0;
  imagen: string = '';
  categoria: string = '';
  imagenBase64: string = ''; 

  constructor(private productService: ApiService) { }
 
  crearProducto(productoForm: NgForm): void {
    const nuevoProducto = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      stock: this.stock,
      categoria: this.categoria,
      imagen: this.imagenBase64 // Aquí enviamos la imagen en formato Base64 al servicio
    };

    this.productService.createProduct(nuevoProducto).subscribe(
      response => {
        console.log('Producto creado correctamente:', response);
        productoForm.resetForm();
        // Realizar cualquier acción adicional después de la creación, como redirigir a otra página o mostrar un mensaje de éxito
        
      },
      error => {
        console.error('Error al crear el producto:', error);
        // Manejar errores de creación, mostrar mensajes de error, etc.
      }
    );
  }

  // Método para manejar la selección de archivos por parte del usuario
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
}
