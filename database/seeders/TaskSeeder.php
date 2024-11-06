<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Task;

class TaskSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run()
	{
		User::factory()->count(10)->create()->each(function ($user) {
			Task::factory()->count(5)->create(['user_id' => $user->id]);
		});
	}
}