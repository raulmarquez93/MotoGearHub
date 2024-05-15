<?php

namespace App\Http\Controllers;

use App\Models\Valoracion;
use Illuminate\Http\Request;

class ValoracionController extends Controller
{
    public function index()
    {
        $valoraciones = Valoracion::all();
        return response()->json($valoraciones);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_usuario' => 'required',
            'id_producto' => 'required',
            'valoracion_numero' => 'required',
            'comentario' => 'required',
            'nombre_usuario' => 'required',
        ]);

        $valoracion = Valoracion::create($request->all());
        return response()->json($valoracion, 201);
    }

    public function show($id)
    {
        $valoracion = Valoracion::where('id_producto', $id)->get();

    // Verificar si se encontraron cestas para el usuario
    if ($valoracion->isEmpty()) {
        // Si no se encontraron cestas, devuelve una respuesta JSON con un mensaje indicando que no se encontraron cestas
        // y un código de estado HTTP 404 (Not Found)
        return response()->json(['message' => 'No se encontraron valoraciones para el producto especificado'], 404);
    }

    // Si se encontraron cestas, devuelve una respuesta JSON con el listado de cestas y un código de estado HTTP 200 (OK)
    return response()->json($valoracion, 200);
    }

    public function update(Request $request, $id)
    {
        $valoracion = Valoracion::findOrFail($id);
        $valoracion->update($request->all());
        return response()->json($valoracion, 200);
    }

    public function destroy($userId, $productId)
{
    echo $userId;
    echo $productId;

    // Buscar la cesta asociada al usuario y producto específicos
    $valoracion = Valoracion::where('id_usuario', $userId)
                  ->where('id_producto', $productId)
                  ->first();

    // Verificar si se encontró la cesta
    if (!$valoracion) {
        // Si no se encontró la cesta, devuelve una respuesta JSON con un mensaje indicando que la cesta no se encontró
        // y un código de estado HTTP 404 (Not Found)
        return response()->json(['message' => 'Cesta no encontrada'], 404);
    }

    // Eliminar la cesta
    $valoracion->delete();

    // Devolver una respuesta JSON con un mensaje de éxito y un código de estado HTTP 200 (OK)
    return response()->json(['message' => 'Cesta eliminada correctamente'], 200);
}


}