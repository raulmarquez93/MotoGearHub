<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cesta extends Model
{
    use HasFactory;
    protected $table = 'cestas'; // Nombre de la tabla en la base de datos

    protected $fillable = [
        'user_id', // ID del usuario asociado a la cesta
        'producto_id', // ID del producto asociado a la cesta
        'cantidad', // Cantidad de productos en la cesta
    ];
}
