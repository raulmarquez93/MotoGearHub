<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cesta;

class CestaController extends Controller
{
    

    public function store(Request $request)
    {
        // Validación de datos
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'producto_id' => 'required|exists:productos,id',
            'cantidad' => 'required|integer|min:1',
        ]);

        // Crear una nueva cesta
        $cesta = Cesta::create($request->all());

        return response()->json($cesta, 201);
    }
    public function show($userId)
{
    // Buscar todas las cestas asociadas al usuario con el ID proporcionado
    $cestas = Cesta::where('user_id', $userId)->get();

    // Verificar si se encontraron cestas para el usuario
    if ($cestas->isEmpty()) {
        // Si no se encontraron cestas, devuelve una respuesta JSON con un mensaje indicando que no se encontraron cestas
        // y un código de estado HTTP 404 (Not Found)
        return response()->json(['message' => 'No se encontraron cestas para el usuario especificado'], 404);
    }

    // Si se encontraron cestas, devuelve una respuesta JSON con el listado de cestas y un código de estado HTTP 200 (OK)
    return response()->json($cestas, 200);
}
public function update(Request $request, $userId, $productId)
{
    // Buscar la cesta asociada al usuario y producto específicos
    $cesta = Cesta::where('user_id', $userId)
                  ->where('producto_id', $productId)
                  ->first();

    // Verificar si se encontró la cesta
    if (!$cesta) {
        // Si no se encontró la cesta, devuelve una respuesta JSON con un mensaje indicando que la cesta no se encontró
        // y un código de estado HTTP 404 (Not Found)
        return response()->json(['message' => 'Cesta no encontrada'], 404);
    }

    // Validar los datos de la solicitud
    $request->validate([
        'cantidad' => 'required|integer|min:1',
    ]);

    // Actualizar la cantidad de la cesta con los datos proporcionados en la solicitud
    $cesta->update(['cantidad' => $request->cantidad]);

    // Devolver una respuesta JSON con los datos actualizados de la cesta y un código de estado HTTP 200 (OK)
    return response()->json($cesta, 200);
}
public function destroy($userId, $productId)
{
    // Buscar la cesta asociada al usuario y producto específicos
    $cesta = Cesta::where('user_id', $userId)
                  ->where('producto_id', $productId)
                  ->first();

    // Verificar si se encontró la cesta
    if (!$cesta) {
        // Si no se encontró la cesta, devuelve una respuesta JSON con un mensaje indicando que la cesta no se encontró
        // y un código de estado HTTP 404 (Not Found)
        return response()->json(['message' => 'Cesta no encontrada'], 404);
    }

    // Eliminar la cesta
    $cesta->delete();

    // Devolver una respuesta JSON con un mensaje de éxito y un código de estado HTTP 200 (OK)
    return response()->json(['message' => 'Cesta eliminada correctamente'], 200);
}


}
