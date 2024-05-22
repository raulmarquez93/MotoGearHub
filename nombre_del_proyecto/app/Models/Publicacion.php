<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Producto;

class Publicacion extends Model
{
    use HasFactory;
    protected $table = 'publicacions'; // Nombre de la tabla en la base de datos
    protected $fillable = [
        'id_usuario', // ID del usuario que publica la publicación
        'id_producto', // ID del producto asociado a la publicación
        'Descripcion', // Descripción de la publicación
        'imagen', // Imagen de la publicación
    ];
    protected $primaryKey = 'id';   
    
    public function usuario(){
        return $this->belongsTo(User::class, 'id_usuario');
    }

    public function  producto(){
        return $this->belongsTo(Producto::class, 'id_producto');
    }
}
