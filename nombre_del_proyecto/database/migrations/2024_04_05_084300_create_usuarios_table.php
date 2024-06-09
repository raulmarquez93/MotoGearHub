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
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->string('Usuario', 15)->primary();
            $table->string('Correo', 255)->unique();
            $table->unsignedInteger('Telefono')->unique();
            $table->text('Imagen')->nullable();
            $table->string('Rol', 10);
            $table->string('Nombre', 20);
            $table->string('Apellidos', 30);
            $table->string('Localizacion', 100);
            $table->string('Sexo', 10);
            $table->string('Contraseña', 250);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
