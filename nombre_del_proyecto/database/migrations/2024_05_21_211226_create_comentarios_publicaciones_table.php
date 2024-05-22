<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComentariosPublicacionesTable extends Migration{
    
    public function up()
    {
        Schema::create('comentarios_publicaciones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('publicacion_id');
            $table->unsignedBigInteger('usuario_id');
            $table->string('nombre');
            $table->text('comentario');
            $table->timestamps();
            
            $table->foreign('publicacion_id')->references('id')->on('publicacions')->onDelete('cascade');
            $table->foreign('usuario_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('comentarios_publicaciones');
    }
}
