<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

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
            $token = Str::random(10);
            $newUser = DB::table('users')->insertGetId([
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),

                'first_name' => $first_name,
                'last_name'  => $last_name,
                // 'gender' => $gender,
                'dob' => $dob,
                'nationality' => $nationality,
                'phone_num' => $phone_num,
                'email' => NULL,
                'password' => NULL,
                'points' => 0,
                'details' => NULL,
                'email_created_at' => NULL,
                'email_verified_at' => NULL,
                'token' => $token,
                'token_expiration' => NULL
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
        $view = $request->view;
        $status = "available";

        $result = DB::table('room')->select('type','floor','room_number','view')
            ->where('type', $roomtype)
            ->where('status', $status)
            ->where('view',$view)
            ->get();

        $prices = DB::table('room_prices')->select('price','capacity')
            ->where('view', $view)
            ->where('type', $roomtype)
            ->get();

        $availableRooms = $result->merge($prices);

        return response()->json($availableRooms);
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
        $activity = "active";

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
                'user_type' => $user_type,
                'activity' => $activity
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

    // public function getReserved(){
    //     $roomInfo = DB::table('room')->select('room_number','floor','id')
    //     ->where('status', 'reserved')
    //     ->get();

    //     $reservationInfo = DB::table('reservation')->select('user_id','date_from','date_to')
    //     ->where('activity', 'active')
    //     ->get();

    //     $userInformation = DB::table('users')->select('first_name','last_name')
    //     ->where('id', $reservationInfo->user_id)
    //     ->first();



    // }
    // public function getReserved(){
    //     $roomInfo = DB::table('room')
    //         ->select('room_number','floor','id')
    //         ->where('status', 'reserved')
    //         ->get();

    //     // return response()->json([
    //     //     'result' => $roomInfo
    //     // ]);
    
    //     $reservationInfo = DB::table('reservation')
    //         ->select('user_id','date_from','date_to')
    //         ->where('activity', 'active')
    //         ->get();

    //     // return response()->json([
    //     //     'result' => $reservationInfo
    //     // ]);
    
    //     $userInformation = DB::table('users')
    //         ->select('id', 'first_name','last_name')
    //         ->whereIn('id', $reservationInfo->pluck('user_id')->toArray())
    //         ->get();
    //         // ->keyBy('id');

    //     // return response()->json([
    //     //     'result' => $userInformation
    //     // ]);    
    // }
    public function getReserved(){
        $roomInfo = DB::table('room')
            ->select('room_number','floor','id')
            ->where('status', 'reserved')
            ->get();


        // var_dump($roomInfo);die;
        // return response()->json([
        //     'result' => $roomInfo
        // ]);
    
        $reservationInfo = DB::table('reservation')
            ->select('room_id', 'user_id','date_from','date_to')
            ->where('activity', 'pending')
            ->get();

        // return response()->json([
        //     'result' => $reservationInfo
        // ]);
        
        $userInformation = DB::table('users')
            ->select('id', 'first_name','last_name')
            ->whereIn('id', $reservationInfo->pluck('user_id')->toArray())
            ->get();

        // return response()->json([
        //     'result' => $userInformation
        // ]);
            
            $mergedData = $roomInfo->map(function ($room) use ($reservationInfo, $userInformation) 
            { 
                $reservation = $reservationInfo->firstWhere('room_id', $room->id); 
                // var_dump($reservation);die;
                $user = $userInformation->firstWhere('id',$reservation->user_id); 
                
                return [ 
                    'room_number' => $room->room_number, 
                    'floor' => $room->floor, 
                    'user' => 
                        [ 
                            'id' => $user->id, 
                            'first_name' => $user->first_name, 
                            'last_name' => $user->last_name 
                        ], 
                            'date_from' => $reservation->date_from, 
                            'date_to' => $reservation->date_to 
                    ];
            }); 
                        
                return $mergedData; 

    }

    public function checkIn(Request $request){
        $room_floor = $request->floor;
        $room_number = $request->number;
    
        $roomid = DB::table('room')
            ->select('id')
            ->where('room_number', $room_number)
            ->where('floor',$room_floor)
            ->first();

        // return response()->json([
        //     'roomID' => $roomid
        // ]);
    
        DB::table('room')
        ->where('id', $roomid->id)
        ->update(['status' => 'busy']);

        return response()->json([
            'success' => true
        ]);
    }
    
    
}