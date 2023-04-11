<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Models\WalkInUser;
use App\Models\Rooms;

class WalkInBookingController extends Controller
{
    public function addUser(Request $request){
        $first_name = $request->firstname;
        $last_name = $request->lastname;
        $gender = $request->gender;
        $dob = $request->dob;
        $nationality = $request->nationality;
        $phone_num = $request->phonenum;

        $user = WalkInUser::where('phone_num', $phone_num)
        ->where('first_name', $first_name)
        ->where('last_name', $last_name)
        ->pluck('id')
        ->first();

        $id = $user;

        if(!$id){
            //User is not in the table
            $newUser = DB::table('in_person_users')->insertGetId([
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'first_name' => $first_name,
                'last_name'  => $last_name,
                'gender' => $gender,
                'dob' => $dob,
                'nationality' => $nationality,
                'phone_num' => $phone_num,
                'details' => NULL,
            ]);
            
            return response()->json([
                'success' => true,
                'user_id' => $newUser,
            ]);
        }
        return response()->json([
            'success' => false,
            'user_id' => $id,
        ]);
        
    }

    public function fetchAvailable(Request $request){
        $roomtype = $request->roomtype;
        $status = "available";
            
        $result = DB::table('room')->select('type','floor','room_number')
            ->where('type', $roomtype)
            ->where('status', $status)
            ->get();
            
        return response()->json([
            'result' => $result
        ]);
    }
    

    public function bookRoom(Request $request){
        // $user_id = $request->id;
        // $room_floor = $request->floor;
        // $room_number = $request->number;
        // $date_from = $request->datefrom;
        // $date_to = $request->dateto;
        // $user_type = "Walk In";
        
        $user_id = "2";
        $room_floor = "2";
        $room_number = "2";
        $date_from = "2023-04-11";
        $date_to = "2023-04-15";
        $user_type = "Walk in";

        $room = DB::table('room')->select('id')
        ->where('floor', $room_floor)
        ->where('room_number', $room_number)
        ->first();

        $reservation = DB::table('reservation')
        ->where('date_from', $date_from)
        ->where('date_to', $date_to)
        ->where('room_id', $room->id)
        ->where('user_id', $user_id)
        ->where('user_type', $user_type)
        ->first();

        // return response()->json([
        //     'value' => $reservation
        // ]);
        
        if(empty($reservation)){
            // If reservation is not found in the table, add it
            $reservation_id = DB::table('reservation')->insertGetId([
                'date_from' => $date_from,
                'date_to' => $date_to,
                'room_id' => $room->id,
                'user_id' => $user_id,
                'user_type' => $user_type
            ]);
        
            // Update the room status to booked
            DB::table('room')
                ->where('id', $room->id)
                ->update(['status' => 'booked']);
        
            // Return the success message
            return response()->json([
                'success' => true,
                'message' => 'Reservation added successfully.',
                'reservation_id' => $reservation_id
            ]);
        } 
        else {
            // If reservation already exists, return an error message
            return response()->json([
                'success' => false,
                'error' => 'Reservation already exists.'
            ]);
        }



    }
}
