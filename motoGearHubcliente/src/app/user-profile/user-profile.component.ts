import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  userProfile: any;
  editMode: string | null = null;
  newName: string = ''; // Define las propiedades newName, newEmail y newPhone
  newEmail: string = '';
  newPhone: string = '';
  newNombreReal: string = '';
  newApellidos: string = '';
  newLocalizacion: string = '';
  newPassword: string = ''; // Define la propiedad newPassword

  Id: string = ' '; 

  constructor(private apiService: ApiService) { }
  
  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.apiService.getUserProfile().subscribe(
      response => {
        this.userProfile = response.data;
      },
      error => {
        console.error('Error al obtener perfil de usuario:', error);
      }
    );
  }

  activateEditMode(field: string): void {
    this.editMode = field;
  }

  cancelEditMode(): void {
    this.editMode = null;
  }

  saveChanges(field: string, value: any): void {
    console.log(field,value);
    this.apiService.updateUserProfile( this.userProfile.id, field, value).subscribe(
      response => {
        console.log(`Guardando cambios en ${field}: ${value}`);
        this.editMode = null;
        this.getUserProfile();
      },
      error => {
        console.error('Error al guardar cambios:', error);
        console.log(field,value);
      }
    );
  }

  // Método para obtener los datos del campo actualmente en edición
  getFieldData(field: string): any {
    switch (field) {
      case 'name':
        return this.newName;
      case 'email':
        return this.newEmail;
      case 'phone':
        return this.newPhone;
      case 'nombreReal':
        return this.newNombreReal;
      case 'apellidos':
        return this.newApellidos;
      case 'localizacion':
        return this.newApellidos;
      
      case 'password':
        return this.newPassword;
      default:

        return '';
    }
  }
}
