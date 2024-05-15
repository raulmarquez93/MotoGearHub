<?php

namespace App\Http\Controllers;
use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    //

    public function index()
    {
        $productos = Producto::all();
        return response()->json([
            "status" => 1,
            "msg" => "Todos los productos",
            "data" => $productos
        ]);
    }


    public function getProducto($id){
        $producto = Producto::find($id);
        if($producto){
            return response()->json([
                "status" => 1,
                "msg" => "Producto encontrado",
                "data" => $producto
            ]);
        }else{
            return response()->json([
                "status" => 0,
                "msg" => "Producto no encontrado"
            ]);
        }
    }
    public function store(Request $request){
        $producto = new Producto();
        $producto->nombre = $request->nombre;
        $producto->descripcion = $request->descripcion;
        $producto->precio = $request->precio;
        $producto->stock = $request->stock;
        $producto->imagen = $request->imagen;
        $producto->categoria = $request->categoria;
        $producto->save();
        return response()->json([
            "status" => 1,
            "msg" => "Producto guardado",
            "data" => $producto
        ]);
    }
    public function update(Request $request, $id){
        $producto = Producto::find($id);
        if($producto){
            $producto->nombre = $request->nombre;
            $producto->descripcion = $request->descripcion;
            $producto->precio = $request->precio;
            $producto->stock = $request->stock;
            $producto->imagen = $request->imagen;
            $producto->categoria = $request->categoria;
            $producto->save();
            return response()->json([
                "status" => 1,
                "msg" => "Producto actualizado",
                "data" => $producto
            ]);
        }else{
            return response()->json([
                "status" => 0,
                "msg" => "Producto no encontrado"
            ]);
        }
    }
    public function destroy($id){
        $producto = Producto::find($id);
        if($producto){
            $producto->delete();
            return response()->json([
                "status" => 1,
                "msg" => "Producto eliminado"
            ]);
        }else{
            return response()->json([
                "status" => 0,
                "msg" => "Producto no encontrado"
            ]);
        }
    }
}
