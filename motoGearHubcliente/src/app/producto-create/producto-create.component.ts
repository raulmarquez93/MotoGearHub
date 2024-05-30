// import { Component } from '@angular/core';
// import { ApiService } from '../api.service';
// import { NgForm } from '@angular/forms'; // Importa NgForm
// @Component({
//   selector: 'app-producto-create',
//   templateUrl: './producto-create.component.html',
//   styleUrl: './producto-create.component.scss'
// })
// export class ProductoCreateComponent {
//   nombre: string = '';
//   descripcion: string = '';
//   precio: number = 0;
//   stock: number = 0;
//   imagen: string = '';
//   categoria: string = '';
//   imagenBase64: string = ''; 

//   constructor(private productService: ApiService) { }
 
//   crearProducto(productoForm: NgForm): void {
//     const nuevoProducto = {
//       nombre: this.nombre,
//       descripcion: this.descripcion,
//       precio: this.precio,
//       stock: this.stock,
//       categoria: this.categoria,
//       imagen: this.imagenBase64 // Aquí enviamos la imagen en formato Base64 al servicio
//     };

//     this.productService.createProduct(nuevoProducto).subscribe(
//       response => {
//         console.log('Producto creado correctamente:', response);
//         productoForm.resetForm();
//         // Realizar cualquier acción adicional después de la creación, como redirigir a otra página o mostrar un mensaje de éxito
        
//       },
//       error => {
//         console.error('Error al crear el producto:', error);
//         // Manejar errores de creación, mostrar mensajes de error, etc.
//       }
//     );
//   }

//   // Método para manejar la selección de archivos por parte del usuario
//   onFileSelected(event: any): void {
//     const file: File = event.target.files[0]; // Obtener el primer archivo seleccionado
//     if (file) {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         this.imagenBase64 = reader.result as string; // Almacenar la imagen en formato Base64 en la variable imagenBase64
//       };
//     }
//   }
  
// }
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.scss']
})
export class ProductoCreateComponent {
  productoForm: FormGroup;
  imagenBase64: string = '';

  constructor(private productService: ApiService, private formBuilder: FormBuilder, private router: Router) {
    this.productoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      precio: [0, [Validators.required, Validators.min(0.01), this.priceValidator]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', [Validators.required, Validators.maxLength(50)]],
      imagen: ['',[Validators.required]]
    });
  }
  priceValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (isNaN(value)) {
      return { invalidPrice: 'El precio debe ser un número válido.' };
    }
    return null;
  }

  crearProducto(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar mensajes de error
      return;
    }

    const nuevoProducto = {
      nombre: this.productoForm.value.nombre,
      descripcion: this.productoForm.value.descripcion,
      precio: this.productoForm.value.precio,
      stock: this.productoForm.value.stock,
      categoria: this.productoForm.value.categoria,
      imagen: this.imagenBase64
    };

    this.productService.createProduct(nuevoProducto).subscribe(
      response => {
        console.log('Producto creado correctamente:', response);
        this.productoForm.reset();
        this.router.navigate(['/productos']); // Redirigir a la lista de productos después de la creación
      },
      error => {
        console.error('Error al crear el producto:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagenBase64 = reader.result as string;
        this.productoForm.controls['imagen'].setValue(this.imagenBase64); // Establecer el valor del control de imagen
      };
    }
  }
}

