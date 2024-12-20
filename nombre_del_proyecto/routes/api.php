<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsuarioController; // Import the missing class
use App\Http\Controllers\ProductoController; // Import the missing class
use App\Http\Controllers\CestaController;
use App\Http\Controllers\ValoracionController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
use App\Http\Controllers\PublicacionController;
use App\Http\Controllers\ComentarioPublicacionController;
use App\Http\Controllers\FollowController;


    Route::post('/follow', [FollowController::class, 'store']);
    Route::delete('/unfollow', [FollowController::class, 'destroy']);
    Route::get('/followers/{user}', [FollowController::class, 'followers']);
    Route::get('/followings/{user}', [FollowController::class, 'followings']);
    Route::get('/followed/{userId}', [FollowController::class, 'getFollowedUsers']);
    Route::delete('/unfollow', [FollowController::class, 'unfollow']);

Route::apiResource('comentarios-publicaciones', ComentarioPublicacionController::class);
Route::put('comentarios-publicaciones/{id}', [ComentarioPublicacionController::class, 'update']);
Route::put('/api/publicaciones/{id}', [PublicacionController::class, 'update']);
 Route::apiResource('publicaciones', PublicacionController::class);
// Route::apiResource('publicaciones/{id}', [PublicacionController::class,'show']);
Route::put('/api/publicaciones/{id}', [PublicacionController::class, 'update']);
Route::post('/valoraciones', [ValoracionController::class, 'store']);
Route::get('/valoraciones', [ValoracionController::class, 'index']);
Route::get('/valoraciones/{id}', [ValoracionController::class, 'show']);
Route::put('/valoraciones/{id}', [ValoracionController::class, 'update']);
Route::delete('/valoraciones/{id}', [ValoracionController::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::put('/update-profile/{id}', [UserController::class, 'updateUser']);
Route::get('/getUsers/', [UserController::class, 'getUsers']);
Route::delete('/deleteUser/{id}', [UserController::class, 'deleteUser']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user-profile', [UserController::class, 'userProfile']);
    Route::get('/logout', [UserController::class, 'logout']);
});

// Route::apiResource('usuarios', UsuarioController::class);
Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::post('/usuarios', [UsuarioController::class, 'store']);
Route::get('/usuarios/{usuario}', [UsuarioController::class, 'show']);
Route::put('/usuarios/{usuario}', [UsuarioController::class, 'update']);
Route::delete('/usuarios/{usuario}', [UsuarioController::class, 'destroy']);
// Route::post('/login', 'AuthController@login');
// Route::post('/register', 'AuthController@register');
Route::get('productos', [ProductoController::class, 'index']);
Route::get('productos/{id}', [ProductoController::class, 'getProducto']);
Route::post('productos', [ProductoController::class, 'store']);
Route::put('productos/{id}', [ProductoController::class, 'update']);
Route::delete('productos/{id}', [ProductoController::class, 'destroy']);



Route::get('/cestas', [CestaController::class, 'index']);
Route::get('/cestas/{userId}', [CestaController::class, 'show']);
Route::post('/cestas', [CestaController::class, 'store']);
Route::put('/cestas/{userId}/{productId}', [CestaController::class, 'update']);
Route::delete('/cestas/{userId}/{productId}', [CestaController::class, 'destroy']);


