import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrl: './producto-edit.component.scss'
})
export class ProductoEditComponent implements OnInit{
  producto: any = {}; // Objeto para almacenar los datos del producto a editar
  imagenBase64: string | ArrayBuffer | null = null; // Variable para almacenar la imagen en formato Base64
editando:boolean = false; // Variable para controlar el estado de edición del producto
  constructor(private productService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductDetail();
  }
  getProductDetail(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtén el ID del producto de los parámetros de la ruta
    if (id !== null) {
      this.productService.getProductById(id).subscribe((data: any) => {
        this.producto = data; // Asigna los detalles del producto obtenidos del servicio
        console.log('Detalles del producto:', this.producto);
      });
    } else {
      console.error('ID del producto no encontrado en la ruta.');
    }
  }
  


  editarProducto(): void {
    this.editando = true;
  
  
    this.productService.actualizarProducto(this.producto.data.id, this.producto.data).subscribe(
      (response: any) => {
        console.log('Producto actualizado correctamente:', response);
        // Realiza cualquier acción adicional después de la actualización, como redirigir a otra página o mostrar un mensaje de éxito
      },
      (error: any) => {
        console.error('Error al actualizar el producto:', error);
        // Maneja errores de actualización, muestra mensajes de error, etc.
      }
    ).add(() => {
      // Marca que la edición ha finalizado
      this.editando = false;
    });
  }
  
  onFileSelected(event: any): void {
    const file: File = event.target.files[0]; // Obtener el primer archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagenBase64 = reader.result as string; // Almacenar la imagen en formato Base64 en la variable imagenBase64
        this.producto.data.imagen = this.imagenBase64; // Actualizar la imagen del producto en el objeto producto.data
      };
    }
  }
}
