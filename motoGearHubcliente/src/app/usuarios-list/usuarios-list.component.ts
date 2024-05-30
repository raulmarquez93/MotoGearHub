// import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../api.service';

// @Component({
//   selector: 'app-usuarios-list',
//   templateUrl: './usuarios-list.component.html',
//   styleUrls: ['./usuarios-list.component.scss']
// })
// export class UsuariosListComponent implements OnInit {
//   userList: any[] = [];
//   filteredUserList: any[] = [];
//   isAdmin: boolean = false;
//   nombreAscendente: boolean = true;
//   busqueda: string = ''; // Variable para almacenar el término de búsqueda
//   ordenamiento: string = 'nombreAsc';
//   constructor(private apiService: ApiService) { }

//   ngOnInit(): void {
//     this.getUserList();
//     this.apiService.isAdmin().subscribe(isAdmin => {
//       this.isAdmin = isAdmin;
//     });
//   }

//   getUserList(): void {
//     this.apiService.getUsersList().subscribe(
//       response => {
//         this.userList = response.data;
//         this.filteredUserList = [...this.userList]; // Inicializar la lista filtrada
//         console.log('Lista de usuarios:', this.userList);
//       },
//       error => {
//         console.error('Error al obtener la lista de usuarios:', error);
//       }
//     );
//   }

//   eliminarUsuario(user: any): void {
//     const id = user.id;
//     if (id !== null) {
//       this.apiService.deleteUser(id).subscribe(
//         response => {
//           console.log('Usuario eliminado correctamente');
//           this.getUserList();
//         },
//         error => {
//           console.error('Error al eliminar el usuario:', error);
//         }
//       );
//     }
//   }
//   filtrarUsuarios(): void {
//     this.filteredUserList = [...this.userList]; // Copiar el array original para mantenerlo intacto
    
//     // Filtrar por nombre
//     if (this.busqueda.trim() !== '') {
//       this.filteredUserList = this.filteredUserList.filter(usuario => usuario.name.toLowerCase().includes(this.busqueda.toLowerCase()));
//     }
    
//     // Ordenar según la opción de ordenamiento seleccionada
//     console.log(this.ordenamiento)
//     console.log(this.filteredUserList);
//     switch (this.ordenamiento) {
//       case 'nombreAsc':
//         this.filteredUserList.sort((a, b) => a.name.localeCompare(b.name));
//         console.log(this.filteredUserList);
//        break;
//       case 'nombreDesc':
//         this.filteredUserList.sort((a, b) => b.name.localeCompare(a.name));
//         break;
//       default:
//         break;
//     }
//   }
  
// }



import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements OnInit {
  userList: any[] = [];
  filteredUserList: any[] = [];
  isAdmin: boolean = false;
  nombreAscendente: boolean = true;
  busqueda: string = ''; // Variable para almacenar el término de búsqueda
  ordenamiento: string = 'nombreAsc';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getUserList();
    this.apiService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  getUserList(): void {
    this.apiService.getUsersList().subscribe(
      response => {
        this.userList = response.data;
        this.filteredUserList = [...this.userList]; // Inicializar la lista filtrada
        console.log('Lista de usuarios:', this.userList);
      },
      error => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }

  eliminarUsuario(user: any): void {
    const id = user.id;
    if (id !== null) {
      this.apiService.deleteUser(id).subscribe(
        response => {
          console.log('Usuario eliminado correctamente');
          this.getUserList();
        },
        error => {
          console.error('Error al eliminar el usuario:', error);
        }
      );
    }
  }

  seguirUsuario(user: any): void {
    const followedId = user.id;
    const followerId = 1; // El ID del usuario que está siguiendo, deberías obtenerlo del contexto actual del usuario logueado

    if (followedId !== null) {
      this.apiService.followUser(followerId, followedId).subscribe(
        response => {
          console.log('Usuario seguido correctamente');
          // Aquí puedes actualizar el estado de la UI si es necesario
        },
        error => {
          console.error('Error al seguir al usuario:', error);
        }
      );
    }
  }

  filtrarUsuarios(): void {
    this.filteredUserList = [...this.userList]; // Copiar el array original para mantenerlo intacto

    // Filtrar por nombre
    if (this.busqueda.trim() !== '') {
      this.filteredUserList = this.filteredUserList.filter(usuario => usuario.name.toLowerCase().includes(this.busqueda.toLowerCase()));
    }

    // Ordenar según la opción de ordenamiento seleccionada
    switch (this.ordenamiento) {
      case 'nombreAsc':
        this.filteredUserList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nombreDesc':
        this.filteredUserList.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
  }
}


