<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ComentarioPublicacion;

class ComentarioPublicacionController extends Controller
{
    public function index()
    {
        $comentarios = ComentarioPublicacion::all();
        return response()->json($comentarios);
    }

    public function store(Request $request)
    {
        $request->validate([
            'publicacion_id' => 'required|exists:publicacions,id',
            'usuario_id' => 'required|exists:users,id',
            'nombre' => 'required|string|max:255',
            'comentario' => 'required|string',
        ]);

        $comentario = ComentarioPublicacion::create($request->all());
        return response()->json($comentario, 201);
    }

    public function show($id)
    {
        $comentario = ComentarioPublicacion::findOrFail($id);
        return response()->json($comentario);
    }

    public function update(Request $request, $id)
    {
        $comentario = ComentarioPublicacion::find($id);
      
if (!$comentario) {
    return response()->json(['message' => 'Comentario no encontrado'], 404);
}

$request->validate([
    'publicacion_id' => 'required|exists:publicacions,id',
    'usuario_id' => 'required|exists:users,id',
    'nombre' => 'required|string|max:255',
    'comentario' => 'required|string',
]);

$comentario->publicacion_id = $request->input('publicacion_id');
$comentario->usuario_id = $request->input('usuario_id');
$comentario->nombre = $request->input('nombre');
$comentario->comentario = $request->input('comentario');
$comentario->save();

return response()->json(['message' => 'Comentario actualizado correctamente'], 200);

    }

    public function destroy($id)
    {
        $comentario = ComentarioPublicacion::findOrFail($id);
        $comentario->delete();
        return response()->json(null, 204);
    }
}
