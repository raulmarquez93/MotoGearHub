<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComentarioPublicacion extends Model
{
    use HasFactory;

    protected $table = 'comentarios_publicaciones';

    protected $fillable = [
        'publicacion_id',
        'usuario_id',
        'nombre',
        'comentario',
    ];

    public function publicacion()
    {
        return $this->belongsTo(Publicacion::class);
    }

    public function usuario()
    {
        return $this->belongsTo(User::class);
    }
}
