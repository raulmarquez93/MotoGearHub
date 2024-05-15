import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrl: './producto-item.component.scss'
})
export class ProductoItemComponent  implements OnInit {
  producto: any; // Define la variable producto para almacenar los detalles del producto
  isAdmin: boolean = false;
  deleting = false;
  userProfile: any;

  constructor(private route: ActivatedRoute, private productService: ApiService,private router: Router) { }

  ngOnInit(): void {
    this.getProductDetail();
    this.productService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    this.getUserProfile()
  }
  getUserProfile(): void {
    this.productService.getUserProfile().subscribe(
      response => {
        this.userProfile = response.data;
      },
      error => {
        console.error('Error al obtener perfil de usuario:', error);
      }
    );
  }

  agregarCesta(productoId: number) {
    const cestaData = {
      user_id :this.userProfile.id,
      producto_id: productoId,
      cantidad: 1
    };
    console.log(cestaData)

    this.productService.addCesta(cestaData).subscribe(() => {
      
    });
  }

  eliminarProducto(): void {
    this.deleting = true; // Actualiza el estado de eliminación a verdadero
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.productService.deleteProduct(id).subscribe(
        response => {
          console.log('Producto eliminado correctamente');
          // Redirige a la lista de productos después de eliminar el producto
          this.router.navigate(['/home']);
         
        },
        error => {
          console.error('Error al eliminar el producto:', error);
          // Manejar errores de eliminación, mostrar mensajes de error, etc.
        },
        () => {
          this.deleting = false; // Actualiza el estado de eliminación a falso cuando la solicitud se complete (tanto si es exitosa como si falla)
        }
      );
    }
  }
  editarProducto(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/producto-edit' , id]);
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
  agregarAlCarrito(){


     this.agregarCesta(this.producto.data.id);
     this.irACesta();
  }
  
  
  
 
  
  irACesta(): void {
    this.router.navigate(['/cesta']);
  }
}
