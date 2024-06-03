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
//   followingList: any[] = [];
//   isAdmin: boolean = false;
//   busqueda: string = '';
//   ordenamiento: string = 'nombreAsc';
//   userProfile: any = {};
//   idUser: number = 0;
//   constructor(private apiService: ApiService) { }

//   ngOnInit(): void {
//     this.getUserProfile();
//     this.apiService.isAdmin().subscribe(isAdmin => {
//       this.isAdmin = isAdmin;
//     });

//   }
//   getUserProfile(): void {
//     this.apiService.getUserProfile().subscribe(
//       response => {
//         this.userProfile = response.data;
//         this.idUser = this.userProfile.id;
//         console.log('Perfil 2 de usuario:', this.userProfile);
//         console.log('Perfil id:', this.userProfile.id);
//         this.getUserList();
//         this.getFollowingList();


//       },
//       error => {
//         console.error('Error al obtener perfil de usuario:', error);
//       }
//     );
//   }


//   getUserList(): void {
//     this.apiService.getUsersList().subscribe(
//       response => {
//         this.userList = response.data;
//         // this.filteredUserList = [...this.userList];
//         console.log('Lista de usuarios:', this.userList);
//         console.log('id de usuario:', this.idUser);
//         this.filteredUserList = this.userList.filter(user => user.id !== this.idUser); 

        
//       },
//       error => {
//         console.error('Error al obtener la lista de usuarios:', error);
//       }
//     );
//   }

//   getFollowingList(): void {
//     console.log("nuevo" + this.idUser);
//     this.apiService.getFollowedUsers(this.idUser).subscribe(
//       response => {
//         console.log("id en followers" + this.idUser);

//         this.followingList = response;
//       //  console.log('Lista de seguidores:', this.followingList);
//       },
//       error => {
//         console.error('Error al obtener la lista de seguidores:', error);
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

//   seguirUsuario(user: any): void {
//     const followedId = user.id;
//     if (followedId !== null) {
//       this.apiService.followUser(this.idUser, followedId).subscribe(
//         response => {
//           console.log('Usuario seguido correctamente');
//           this.getFollowingList(); // Actualizar la lista de seguidos
//         },
//         error => {
//           console.error('Error al seguir al usuario:', error);
//         }
//       );
//     }
//   }

//   dejarDeSeguirUsuario(user: any): void {
//     const followedId = user.id;
//     if (followedId !== null) {
//       console.log('Dejar de seguir al usuario:', followedId);
//       this.apiService.unfollowUser(this.idUser, followedId).subscribe(
//         response => {
//           console.log('Usuario dejado de seguir correctamente');
//           this.getFollowingList(); // Actualizar la lista de seguidos
//         },
//         error => {
//           console.error('Error al dejar de seguir al usuario:', error);
//         }
//       );
//     }
//   }

//   esSeguido(user: any): boolean {
//     // console.log('Usuario:', user);
//      // console.log('Lista de seguidos:', this.followingList);
//     // console.log('¿Es seguido?', this.followingList.some(following => following.id === user.id));
//     return this.followingList.some(following => following.id === user.id);
//   }

//   filtrarUsuarios(): void {
//     ///this.filteredUserList = [...this.userList];

//     if (this.busqueda.trim() !== '') {
//       this.filteredUserList = this.filteredUserList.filter(usuario => 
//         usuario.name.toLowerCase().includes(this.busqueda.toLowerCase())
//       );
//     }

//     switch (this.ordenamiento) {
//       case 'nombreAsc':
//         this.filteredUserList.sort((a, b) => a.name.localeCompare(b.name));
//         break;
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
  followedUsers: any[] = []; // Lista local de usuarios seguidos
  isAdmin: boolean = false;
  nombreAscendente: boolean = true;
  busqueda: string = ''; // Variable para almacenar el término de búsqueda
  ordenamiento: string = 'nombreAsc';
  mostrarOpcion: string = 'todos'; // Nueva variable para el filtro de visualización

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getUserList();
    this.apiService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    this.getFollowedUsers();
  }

  getUserList(): void {
    this.apiService.getUsersList().subscribe(
      response => {
        this.userList = response.data;
        this.filteredUserList = [...this.userList]; // Inicializar la lista filtrada
        this.filtrarUsuarios(); // Filtrar usuarios inmediatamente después de obtener la lista
        console.log('Lista de usuarios:', this.userList);
      },
      error => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }

  getFollowedUsers(): void {
    const followerId = 1; // El ID del usuario que está obteniendo los usuarios seguidos, deberías obtenerlo del contexto actual del usuario logueado

    this.apiService.getFollowedUsers(followerId).subscribe(
      response => {
        this.followedUsers = response; // Guardar los usuarios seguidos localmente
        console.log('Usuarios seguidos:', this.followedUsers);
        this.filtrarUsuarios(); // Filtrar usuarios después de obtener la lista de seguidos
      },
      error => {
        console.error('Error al obtener la lista de usuarios seguidos:', error);
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
          this.getFollowedUsers(); // Actualizar la lista de usuarios seguidos
        },
        error => {
          console.error('Error al seguir al usuario:', error);
        }
      );
    }
  }

  dejarDeSeguirUsuario(user: any): void {
    const followedId = user.id;
    const followerId = 1; // El ID del usuario que está dejando de seguir, deberías obtenerlo del contexto actual del usuario logueado

    if (followedId !== null) {
      this.apiService.unfollowUser(followerId, followedId).subscribe(
        response => {
          console.log('Usuario dejado de seguir correctamente');
          this.getFollowedUsers(); // Actualizar la lista de usuarios seguidos
        },
        error => {
          console.error('Error al dejar de seguir al usuario:', error);
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

    // Filtrar según la opción seleccionada
    switch (this.mostrarOpcion) {
      case 'seguidos':
        this.filteredUserList = this.filteredUserList.filter(usuario => this.isFollowing(usuario));
        break;
      case 'noSeguidos':
        this.filteredUserList = this.filteredUserList.filter(usuario => !this.isFollowing(usuario));
        break;
      case 'todos':
      default:
        // No hacer nada
        break;
    }
  }

  isFollowing(user: any): boolean {
    return this.followedUsers.some(followedUser => followedUser.id === user.id);
  }
}

