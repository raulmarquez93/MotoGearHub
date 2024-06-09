<?php
namespace App\Http\Controllers;

use App\Models\Follow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class FollowController extends Controller
{
    public function store(Request $request)
    {
        // Validar la solicitud
        $request->validate([
            'follower_id' => 'required|exists:users,id',
            'followed_id' => 'required|exists:users,id',
        ]);

        // Crear una nueva relación de seguimiento
        $follow = new Follow();
        $follow->follower_id = $request->follower_id;
        $follow->followed_id = $request->followed_id;
        $follow->save();

        return response()->json(['message' => 'Usuario seguido correctamente', 'follow' => $follow], 201);
    }
    public function getFollowedUsers($userId)
    {
        // Obtener los usuarios seguidos
        $followedUsers = Follow::where('follower_id', $userId)->with('followedUser')->get()->pluck('followedUser');

        return response()->json($followedUsers, 200);
    }
    public function unfollow(Request $request)
    {
        // Validar la solicitud
        $request->validate([
            'follower_id' => 'required|exists:users,id',
            'followed_id' => 'required|exists:users,id',
        ]);

        // Buscar y eliminar la relación de seguimiento
        $follow = Follow::where('follower_id', $request->follower_id)
                        ->where('followed_id', $request->followed_id)
                        ->first();

        if ($follow) {
            $follow->delete();
            return response()->json(['message' => 'Usuario dejado de seguir correctamente'], 200);
        } else {
            return response()->json(['message' => 'Relación de seguimiento no encontrada'], 404);
        }
    }
}
