<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Valoracion extends Model
{
    
    use HasFactory;
    protected $table = 'valoracions'; // Nombre de la tabla en la base de datos

    protected $fillable = [
        
        'id_usuario',
        'id_producto',
        'valoracion_numero',
        'comentario',
        'nombre_usuario',
        
    ];
     
}