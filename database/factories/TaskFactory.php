<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Carbon\Carbon;

class TaskFactory extends Factory
{
	protected $model = Task::class;

	public function definition()
	{
		return [
			'title' => $this->faker->sentence,
			'description' => $this->faker->paragraph,
			'status' => $this->faker->randomElement(['pending', 'completed']),
			'due_date' => Carbon::now()->addDays(rand(1, 30)),
			'user_id' => \App\Models\User::factory(), // assumes a User factory is available
		];
	}
}
