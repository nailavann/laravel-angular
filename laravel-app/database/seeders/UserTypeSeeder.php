<?php

namespace Database\Seeders;

use App\Models\UserType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            [
                'name' => 'User'
            ], [
                'name' => 'Admin'
            ]
        ];

        foreach ($types as $type){
            UserType::query()->create([
                'name' => $type['name'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
