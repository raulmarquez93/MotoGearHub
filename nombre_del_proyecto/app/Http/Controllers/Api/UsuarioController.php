<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuarios;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{   

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Usuarios::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'Usuario' => 'required|unique:usuarios,Usuario|max:15',
            'Correo' => 'required|unique:usuarios,Correo|max:255',
            'Telefono' => 'required|unique:usuarios,Telefono|numeric',
            'Imagen' => 'nullable',
            'Rol' => 'required|max:10',
            'Nombre' => 'required|max:20',
            'Apellidos' => 'required|max:30',
            'Localizacion' => 'required|max:100',
            'Sexo' => 'required|max:10',
            'Contraseña' => 'required|max:250',
        ]);

        return Usuarios::create($request->all());
    
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Usuarios  $usuarios
     * @return \Illuminate\Http\Response
     */
    public function show($usuario)
    {
        // Buscar al usuario por su nombre de usuario
        $usuarioEncontrado = Usuarios::where('Usuario', $usuario)->first();
    
        if (!$usuarioEncontrado) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    
        return response()->json($usuarioEncontrado);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Usuarios  $usuarios
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Usuarios $usuarios)
    {
        $request->validate([
            'Usuario' => 'required|unique:usuarios,Usuario,' . $usuarios->id . '|max:15',
            'Correo' => 'required|unique:usuarios,Correo,' . $usuarios->id . '|max:255',
            'Telefono' => 'required|unique:usuarios,Telefono,' . $usuarios->id . '|numeric',
            'Imagen' => 'nullable',
            'Rol' => 'required|max:10',
            'Nombre' => 'required|max:20',
            'Apellidos' => 'required|max:30',
            'Localizacion' => 'required|max:100',
            'Sexo' => 'required|max:10',
            'Contraseña' => 'required|max:250',
        ]);

        $usuarios->update($request->all());

        return $usuarios;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Usuarios  $usuarios
     * @return \Illuminate\Http\Response
     */
    public function destroy(Usuarios $usuarios)
    {
        $usuarios->delete();

        return response()->json(null, 204);
    }
}
