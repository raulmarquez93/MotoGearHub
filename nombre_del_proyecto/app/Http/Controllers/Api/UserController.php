<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    public function register(Request $request){
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
            'phone' => 'required|string',
            'rol' => 'required|string', // Nueva validación para el campo 'rol'
            'nombreReal' => 'required|string', // Nueva validación para el campo 'nombreReal'
            'apellidos' => 'required|string', // Nueva validación para el campo 'apellidos'
            'localizacion' => 'required|string' // Nueva validación para el campo 'localizacion'
            
        ]);
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password) ;
        $user->phone = $request->phone;
        $user->rol = $request->rol;
        $user->nombreReal = $request->nombreReal;
        $user->apellidos = $request->apellidos;
        $user->localizacion = $request->localizacion;
        $user->save();
        return response()->json([
            "status" => 1,
            "msg" => "Usuario registrado correctamente",

        ]);

        // $user = User::create([
        //     'name' => $fields['name'],
        //     'email' => $fields['email'],
        //     'password' => bcrypt($fields['password'])
        // ]);

        // $token = $user->createToken('myapptoken')->plainTextToken;

        // $response = [
        //     'user' => $user,
        //     'token' => $token
        // ];

        // return response($response, 201);
    }
    public function getUsers() {
        // Obtener todos los usuarios de la base de datos
        $users = User::all();
    
        // Verificar si se encontraron usuarios
        if ($users->isEmpty()) {
            return response()->json([
                'status' => 0,
                'msg' => 'No se encontraron usuarios'
            ], 404);
        }
    
        // Devolver los usuarios como respuesta
        return response()->json([
            'status' => 1,
            'msg' => 'Lista de usuarios obtenida correctamente',
            'data' => $users
        ]);
    }
    public function login(Request $request){
         $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', "=", $request->email)->first();

        // Check password
        if (isset($user->id)){
            if (Hash::check($request->password, $user->password)){
                $token = $user->createToken('auth_token')->plainTextToken;
                return response()->json([
                    'status' => 1,
                    'access_token' => $token,
                    'msg' => "Usuario logeado correctamente"
                ]);
            } else {
                return response()->json([
                    'status' => 0,
                    'msg' => 'Contraseña incorrecta',
                    'password' => $request->password,
                    'real_password' => $user->password

                ],404);

            }
        }else{
            return response()->json([
                'status' => 0,
                'msg' => 'usuario no registrado'
            ],404);
        }
    
    }
      


public function logout(){
    auth()->user()->tokens()->delete();
    return response()->json([
        'status' => 1,
        'msg' => 'Cierre de sesion exitoso',
        'data' => auth()->user()
    ]);

}

    
public function userProfile(){
    return response()->json([
        'status' => 0,
        'msg' => 'Usuario autenticado',
        'data' => auth()->user()
    ]);

}

public function updateUser(Request $request, $id){
    // Buscamos el usuario por su ID
    $user = User::find($id);

    // Si el usuario no existe, retornamos un mensaje de error
    if (!$user) {
        return response()->json([
            'status' => 0,
            'msg' => 'Usuario no encontrado'
        ], 404);
    }

    // Validamos y actualizamos los campos que se pueden cambiar
    $fieldsToUpdate = $request->validate([
        'name' => 'string',
        'email' => 'string|unique:users,email,'.$id, // El email debe ser único, excepto para el usuario actual
        'phone' => 'string',
        'rol' => 'string',
        'nombreReal' => 'string',
        'apellidos' => 'string',
        'localizacion' => 'string',
        'password' => 'string|confirmed' // La contraseña debe ser confirmada
    ]);

    // Si se proporcionó una nueva contraseña, la hasheamos y la asignamos al usuario
    if ($request->has('password')) {
        $fieldsToUpdate['password'] = Hash::make($request->password);
    }

    // Actualizamos los campos del usuario con los valores proporcionados
    $user->fill($fieldsToUpdate)->save();

    // Retornamos una respuesta con un mensaje de éxito
    return response()->json([
        'status' => 1,
        'msg' => 'Usuario actualizado correctamente',
        'data' => $user
    ]);
}

public function deleteUser($id){
    // Buscamos el usuario por su ID
    $user = User::find($id);

    // Si el usuario no existe, retornamos un mensaje de error
    if (!$user) {
        return response()->json([
            'status' => 0,
            'msg' => 'Usuario no encontrado'
        ], 404);
    }

    // Eliminamos el usuario
    $user->delete();

    // Retornamos una respuesta con un mensaje de éxito
    return response()->json([
        'status' => 1,
        'msg' => 'Usuario eliminado correctamente'
    ]);
}

}