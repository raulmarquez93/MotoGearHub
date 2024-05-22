<?php

namespace App\Http\Controllers;

use App\Models\Publicacion;
use Illuminate\Http\Request;

class PublicacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Publicacion::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
  

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id_usuario' => 'required|exists:users,id',
            'id_producto' => 'nullable|exists:productos,id',
            'Descripcion' => 'required|string',
            'imagen' => 'required|string',
        ]);

        $publicacion = Publicacion::create($request->all());
        return response()->json($publicacion, 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Publicacion  $publicacion
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $publicacion = Publicacion::where('id', $id)->get();

        // Verificar si se encontraron cestas para el usuario
        if ($publicacion->isEmpty()) {
            // Si no se encontraron cestas, devuelve una respuesta JSON con un mensaje indicando que no se encontraron cestas
            // y un código de estado HTTP 404 (Not Found)
            return response()->json(['message' => 'No se encontraron valoraciones para el producto especificado'], 404);
        }
    
        // Si se encontraron cestas, devuelve una respuesta JSON con el listado de cestas y un código de estado HTTP 200 (OK)
        return response()->json($publicacion, 200);
 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Publicacion  $publicacion
     * @return \Illuminate\Http\Response
     */
    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Publicacion  $publicacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id){
        $publicacion = Publicacion::find($id);

        // Si no se encuentra la publicación, retornar una respuesta 404
        if (!$publicacion) {
            return response()->json([
                'status' => 0,
                'msg' => 'Publicacion no encontrada'
            ], 404);
        }

        // Validar los datos recibidos en la solicitud
        $validatedData = $request->validate([
            'id_usuario' => 'required|exists:users,id',
            'id_producto' => 'nullable|exists:productos,id',
            'Descripcion' => 'required|string',
            'imagen' => 'required|string',
        ]);

        // Log para verificar los datos validados

        // Actualizar los campos de la publicación
        $publicacion->id_usuario = $validatedData['id_usuario'];
        if (array_key_exists('id_producto', $validatedData)) {
            $publicacion->id_producto = $validatedData['id_producto'];
        }
        $publicacion->Descripcion = $validatedData['Descripcion'];
        $publicacion->imagen = $validatedData['imagen'];
        $publicacion->save();

        // Retornar una respuesta JSON con el estado y los datos actualizados
        return response()->json([
            "status" => 1,
            "msg" => "Publicacion actualizada correctamente",
            "data" => $publicacion
        ]);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Publicacion  $publicacion
     * @return \Illuminate\Http\Response
     */
    public function destroy($publicacion)
    {

        $publicacion = Publicacion::find($publicacion);
          // Verificar si se encontró la valoración
          if (!$publicacion) {
            // Si no se encontró la valoración, devuelve una respuesta JSON con un mensaje indicando que la valoración no se encontró
            // y un código de estado HTTP 404 (Not Found)
            return response()->json(['message' => 'Valoración no encontrada'], 404);
        }
        $publicacion->delete();

        return response()->json(['message' => 'Publicacion eliminada correctamente'], 200);
    }
}
