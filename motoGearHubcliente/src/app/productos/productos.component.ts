import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import{ OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit {
  productos!: any[];
  isAdmin: boolean = false;
  productosFiltrados!: any[];
  categorias: string[] = []; // Lista de categorías disponibles
  filtroCategoria: string = ''; // Filtro de categoría seleccionado
  filtroPrecioMinimo: number = 0; // Filtro de precio mínimo
  filtroPrecioMaximo: number = 10000; // Filtro de precio máximo
  ordenamiento: string = 'nombreAsc'; // Ordenar por nombre ascendente por defecto
  busqueda: string = '';
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.obtenerProductos();
   
  }


  
  
  obtenerProductos(): void {
    this.apiService.getProductos().subscribe(
      (response) => {
        // Asigna la lista de productos al arreglo productos
        this.productos = response.data;
        this.filtrarProductos();

      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
  
  filtrarProductos(): void {
    this.productosFiltrados = [...this.productos]; // Copiar el array original para mantenerlo intacto
    console.log(this.filtroCategoria)
    
    if (this.filtroCategoria !== '') {
      this.productosFiltrados = this.productosFiltrados.filter(producto => producto.categoria === this.filtroCategoria);
    }

    // Filtrar por precio mínimo
    this.productosFiltrados = this.productosFiltrados.filter(producto => producto.precio >= this.filtroPrecioMinimo);

    // Filtrar por precio máximo
    this.productosFiltrados = this.productosFiltrados.filter(producto => producto.precio <= this.filtroPrecioMaximo);
    if (this.busqueda.trim() !== '') {
      this.productosFiltrados = this.productosFiltrados.filter(producto => producto.nombre.toLowerCase().includes(this.busqueda.toLowerCase()));
    }
    
    
    // Ordenar según la opción de ordenamiento seleccionada
    switch (this.ordenamiento) {
      case 'nombreAsc':
        this.productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'nombreDesc':
        this.productosFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case 'precioAsc':
        this.productosFiltrados.sort((a, b) => a.precio - b.precio);
        break;
      case 'precioDesc':
        this.productosFiltrados.sort((a, b) => b.precio - a.precio);
        break;
      default:
        break;
    }
  }
  
}
