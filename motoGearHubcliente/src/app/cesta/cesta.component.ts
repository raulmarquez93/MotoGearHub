import { Component } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.scss'
})
export class CestaComponent {

  userId?: number;
  userProfile: any = {};
  productosEnCesta: any[] = [];
  itmeCesta:  any[] = [];

  constructor(private cestaService: ApiService) { }

  ngOnInit(): void {
    this.getUserProfile();
  }
  loadCestas(idUser: number) {
    if (this.userProfile && this.userProfile.id) {
      this.cestaService.getCestas(idUser).subscribe((data: any[]) => {
        this.productosEnCesta = data.map((producto: any) => ({
          productoId: producto.producto_id,
          cantidad: producto.cantidad
        }));
        console.log("Cesta obtenida:", this.productosEnCesta);
        this.productosEnCesta.forEach(item => {
          this.obtenerProducto(item.productoId);
        });
      });
    } else {
      console.error('Error: No se pudo obtener el ID de usuario del perfil.');
    }
  }
  
  

  obtenerProducto(idProducto: string) {
    this.cestaService.getProductById(idProducto).subscribe(data => {
      if (data.status === 1) {
        const productoEnCesta = this.productosEnCesta.find(item => item.productoId === idProducto);
        if (productoEnCesta) {
          productoEnCesta.productoDetallado = data.data;
        }
        console.log("Producto obtenido:", data.data);
      } else {
        console.error("Error al obtener producto:", data.msg);
      }
    });
  }
 
 

  getUserProfile(): void {
    this.cestaService.getUserProfile().subscribe(
      response => {
        this.userProfile = response.data;
        this.loadCestas(this.userProfile.id);
      },
      error => {
        console.error('Error al obtener perfil de usuario:', error);
      }
    );
  }

  actualizarCesta(productoId: number, cantidad: number) {
    const cestaData = {
      cantidad: cantidad
    };

    this.cestaService.updateCesta(this.userProfile.id, productoId, cestaData).subscribe(() => {
      this.loadCestas(this.userProfile.id);
    });
  }

  eliminarCesta(productoId: number) {
    this.cestaService.deleteCesta(this.userProfile.id, productoId).subscribe(() => {
      this.productosEnCesta = [];
      this.loadCestas(this.userProfile.id);
    });
  }

  calcularTotalCompra(): string {
    let total = 0;
    for (const item of this.productosEnCesta) {
      total += item.productoDetallado.precio * item.cantidad;
    }
    return total.toFixed(2); // Limita el total a 2 decimales
  }
  
  
  realizarCompra(): void {
    const idsProductos: number[] = this.productosEnCesta.map(item => item.productoDetallado.id);
    // Llama al método eliminarCesta con los IDs de los productos en la cesta
    idsProductos.forEach(id => this.eliminarCesta(id));
    
    this.productosEnCesta = [];
  }
  
}
