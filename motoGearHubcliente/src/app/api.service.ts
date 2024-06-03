import { Injectable } from '@angular/core';
// import { environment } from '../environments/environment'; // Asegúrate de corregir el nombre del archivo
import { HttpClientModule, HttpClient,HttpHeaders  } from '@angular/common/http'; // Importa HttpClientModule y HttpClient
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   private loggedIn = new BehaviorSubject<boolean>(false);




  apiUrl = "http://127.0.0.1:8000/api"; // Corregido el formato de la URL del backend

  constructor(private http: HttpClient, private cookieService: CookieService) { 
    const token = this.cookieService.get('access_token');
    this.loggedIn.next(!!token);
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`; // Specific endpoint for login
    const body = { email, password };
    this.loggedIn.next(true);

    return this.http.post(url, body);
  }
  register(userData: any): Observable<any> {
    const url = `${this.apiUrl}/register`; // Specific endpoint for registration
    const formattedData = {
      name: userData.username, // Asumiendo que el nombre de usuario se almacena en 'username'
      email: userData.email,
      phone: userData.phone,
      rol: userData.rol,
      nombreReal: userData.nombreReal,
      apellidos: userData.apellidos,
      localizacion: userData.localizacion,
      password: userData.password,
      password_confirmation: userData.confirmPassword
    };
    return this.http.post(url, formattedData);
  
  
  }
  logout(): Observable<any> {
    const url = `${this.apiUrl}/logout`; // Endpoint para el logout
    const token = this.cookieService.get('access_token'); // Obtener el token de las cookies
  console.log('Token de la cookie:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.loggedIn.next(false);
    this.cookieService.delete('access_token');

    // Enviar la solicitud GET con los encabezados
    return this.http.get(url, { headers });
  }

  getUserProfile(): Observable<any> {
    const url = `${this.apiUrl}/user-profile`; // Endpoint para obtener el perfil del usuario
    const token = this.cookieService.get('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(url, { headers });
  }

  updateUserProfile(userId: number, field: string, value: any): Observable<any> {
    let body: any;
  
    // Verifica si el campo es 'password'
    if (field === 'password') {
     
  
      // Configura el cuerpo de la solicitud con la contraseña y su confirmación
      body = {
        password: value,
        password_confirmation: value
      };
    } else {
      // Configura el cuerpo de la solicitud con el campo y su nuevo valor
      body = { [field]: value };
    }
  
    // Realiza la solicitud PUT al API con el cuerpo de la solicitud configurado
    return this.http.put<any>(`${this.apiUrl}/update-profile/${userId}`, body);
  }
  
  
  deleteUser(id: string): Observable<any> {
  const url = `${this.apiUrl}/deleteUser/${id}`;
  return this.http.delete(url);
  } 


  handleLoginResponse(response: any): void {
    if (response.status === 1 && response.access_token) {
      console.log('Token guardado en la cookie:', response.access_token);
      // Guardar el token en una cookie
      this.cookieService.set('access_token', response.access_token);

    } else {
      // Mostrar un mensaje de error en la interfaz de usuario
      console.error('Error al iniciar sesión:', response.msg);
    }
  }
  getUsersList(): Observable<any> {
    const url = `${this.apiUrl}/getUsers`; 
    return this.http.get<any>(url);
  }

  getProductos(): Observable<any> {
    const url = `${this.apiUrl}/productos`; 
    return this.http.get<any>(url);
  }
  getProductById(id: string): Observable<any> {
    const url = `${this.apiUrl}/productos/${id}`;
    return this.http.get<any>(url);
  }
  isAdmin(): Observable<boolean> {
    const url = `${this.apiUrl}/user-profile`; // Endpoint para obtener el perfil del usuario
    const token = this.cookieService.get('access_token');
    if (!token) {
      console.log('No se encontró el token en el almacenamiento local.');
      return of(false); // Si no hay token, el usuario no es admin
    }
    // Agregar el token a la cabecera de la solicitud
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<any>(url, { headers }).pipe(
      map((userProfile: any) => {
        // Verificar si el usuario tiene un rol de administrador
        console.log('Perfil del usuario:', userProfile);
        console.log('Rol del usuario:', userProfile.data.rol);
        return userProfile && userProfile.data.rol === 'admin';
      }),
      catchError(() => {
        console.error('Error al obtener el perfil del usuario.');
        return of(false);
      })
    );
  }
  deleteProduct(productId: string): Observable<any> {
    const url = this.apiUrl + '/productos/' + productId;
    return this.http.delete(url);
  }
  createProduct(productData: any): Observable<any> {
    const url = `${this.apiUrl}/productos`;
    return this.http.post(url, productData);
  }
  actualizarProducto(id: string, productData: any): Observable<any> {
    const url = `${this.apiUrl}/productos/${id}`;
    return this.http.put(url, productData);
  }

  getCestas(userId: number): Observable<any> {
    const url = `${this.apiUrl}/cestas`;

    return this.http.get(`${url}/${userId}`);
  }

  addCesta(cestaData: any): Observable<any> {
    const url = `${this.apiUrl}/cestas`;
  console.log(cestaData)
    return this.http.post(url, cestaData);
  }

  updateCesta(userId: number, productId: number, cestaData: any): Observable<any> {
    const url = `${this.apiUrl}/cestas`;

    return this.http.put(`${url}/${userId}/${productId}`, cestaData);
  }

  deleteCesta(userId: number, productId: number): Observable<any> {
    const url = `${this.apiUrl}/cestas`;

    return this.http.delete(`${url}/${userId}/${productId}`);
  }
  getValoracionById(id: string): Observable<any> {
    const url = `${this.apiUrl}/valoraciones/${id}`;
    return this.http.get<any>(url);
  }
  deleteValoracion(valoracionId: string): Observable<any> {
    const url = this.apiUrl + '/valoraciones/' + valoracionId;
    return this.http.delete(url);
  }
  createValoracion(valoracionData: any): Observable<any> {
    const url = `${this.apiUrl}/valoraciones`;
    return this.http.post(url, valoracionData);
  }
  getPublicaciones(): Observable<any> {
    const url = `${this.apiUrl}/publicaciones`;

    return this.http.get(url);
  }

  getPublicacion(id: number): Observable<any> {
    const url = `${this.apiUrl}/publicaciones`;

    return this.http.get(`${url}/${id}`);
  }

  addPublicacion(publicacion: any): Observable<any> {
    const url = `${this.apiUrl}/publicaciones`;

    return this.http.post(url, publicacion);
  }

  updatePublicacion(id: number, publicacion: any): Observable<any> {
    const url = `${this.apiUrl}/publicaciones`;
    return this.http.put(`${url}/${id}`, publicacion);
  }

  deletePublicacion(id: number): Observable<any> {
    const url = `${this.apiUrl}/publicaciones`;

    return this.http.delete(`${url}/${id}`);
 
  }

  getComentarios(): Observable<any> {
    const url = `${this.apiUrl}/comentarios-publicaciones`;

    return this.http.get(`${url}`);
  }
  addComentario(comentario: any): Observable<any> {
    const url = `${this.apiUrl}/comentarios-publicaciones`;

    return this.http.post(url, comentario);
  }
  deleteComentario(comentarioId: number): Observable<any> {
    const url = `${this.apiUrl}/comentarios-publicaciones/${comentarioId}`;

    return this.http.delete(`${url}`);
  }
  updateValoracion(valoracionId: string, valoracionData: any): Observable<any> {
    const url = `${this.apiUrl}/valoraciones/${valoracionId}`;
    return this.http.put(url, valoracionData);
  }
  followUser(followerId: number, followedId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/follow`, {
      follower_id: followerId,
      followed_id: followedId
    });
  }
  unfollowUser(followerId: number, followedId: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        follower_id: followerId,
        followed_id: followedId
      }
    };
  
    return this.http.delete(`${this.apiUrl}/unfollow`, options);
  }
  

  getFollowedUsers(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/followed/${userId}`);
  }
}