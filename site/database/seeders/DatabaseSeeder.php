<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // User::factory(10)->create();
        // bj: This is where you add seeds to automatically create rooms when the migrations happen
        
        $room_types = [
            'single' => range(1, 3),
            'double' => range(4, 6),
            'suite' => range(7, 7),
        ];
        
        for ($floor = 1; $floor <= 6; $floor++) {
            for ($room_number = 1; $room_number <= 7; $room_number++) {
                $view = in_array($room_number, [5, 6, 7]); // Set the view to true if the room number is 5, 6, or 7
                $type = '';

                foreach ($room_types as $room_type => $range) {
                    if (in_array($room_number, $range)) {
                        $type = $room_type;
                        break;
                    }
                }

                DB::table('room')->insert([
                    'view' => $view,
                    // 'room_number' => $floor . sprintf('%02d', $room_number), // Generate the room number string
                    'room_number' => $room_number,
                    'floor' => $floor,
                    'type' => $type,
                    'status' => 'available', // Set the default status to available
                ]);
            }
        }

        $roomTypes = ['single', 'double', 'suite'];
        $roomViews = [true, false];
        $prices = [
            ['single', true, 50,2],
            ['single', false, 40,2],
            ['double', true, 70,2],
            ['double', false, 60,2],
            ['suite', true, 90,3],
            ['suite', false, 80,3],
        ];

        foreach ($prices as $values) {
            $roomType = $values[0];
            $roomView = $values[1];
            $price = $values[2];
            $capacity = $values[3];

            DB::table('room_prices')->insert([
                'type' => $roomType,
                'view' => $roomView,
                'price' => $price,
                'capacity' =>$capacity,
            ]);
        }


    }
}
