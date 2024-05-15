<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('valoracions', function (Blueprint $table) {
            $table->id();

                $table->unsignedBigInteger('id_usuario');
                $table->unsignedBigInteger('id_producto');
                $table->unsignedTinyInteger('valoracion_numero'); // Podría ser TinyInteger si el rango es de 0 a 255
                $table->text('comentario')->nullable();
                $table->string('nombre_usuario')->nullable(); // Suponiendo que este sea un nombre de usuario opcional
                $table->timestamps(); // Campos created_at y updated_at
                
                
    
                // Restricciones de clave externa
                $table->foreign('id_usuario')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('id_producto')->references('id')->on('productos')->onDelete('cascade');
                $table->unique(['id_usuario', 'id_producto']);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('valoracions');
    }
};
