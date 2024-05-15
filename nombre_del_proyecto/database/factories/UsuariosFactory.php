<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Usuarios; 

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Usuarios>
 */
class UsuariosFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Usuarios::class;

    public function definition()
    {

        return [
            'Usuario' => $this->faker->unique()->userName,
            'Correo' => $this->faker->unique()->safeEmail,
            'Telefono' => $this->faker->unique()->numberBetween(20000000, 99999999),
            'Imagen' => $this->faker->optional()->imageUrl(640, 480, 'usuarios', true),
            'Rol' => $this->faker->randomElement(['admin', 'usuario']),
            'Nombre' => $this->faker->firstName,
            'Apellidos' => $this->faker->lastName . ' ' . $this->faker->lastName,
            'Localizacion' => $this->faker->address,
            'Sexo' => $this->faker->randomElement(['Masculino', 'Femenino', 'Otro']),
            'Contraseña' => $this->faker->password, // Considera encriptar esta contraseña antes de usarla en un entorno real
        ];
    }
}
