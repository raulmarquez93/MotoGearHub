<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens; // Agrega esta línea

class Usuarios extends Model
{
    
    use HasFactory, HasApiTokens; // Incluye el trait HasApiTokens

    protected $fillable = [
        'Usuario', 'Correo', 'Telefono', 'Imagen', 'Rol', 'Nombre', 'Apellidos', 'Localizacion', 'Sexo', 'Contraseña'
    ];

    protected $hidden = [
        'Contraseña',
    ];
}
