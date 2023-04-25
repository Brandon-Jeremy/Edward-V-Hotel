<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use Illuminate\Support\Facades\Mail;
use App\Mail\ReservationConfirmation;



class OnlineReservationController extends Controller
{

    public function createReservation(Request $request)
    {
        $email = $request->email;
        $user = DB::table('users')
        ->where('email',$email)
        ->first();

        if (empty($user)){
            return response()->json([
                "error" => "User does not exist"
            ]);
        }
        $date_from = $request->date_from;
        $date_to = $request->date_to;

        $room_id = $request->roomid;
        $user_id = $user->id;

        //Reservation info
        $activity = 'pending';
        $user_type = 'Online';

        $reservation_id = DB::table('reservation')->insertGetId([
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'date_from' => $date_from,
            'date_to' => $date_to,
            'room_id' => $room_id,
            'user_id' => $user_id,
            'user_type' => $user_type,
            'activity' => $activity
        ]);

        $mailData = [
            'datefrm' => $date_from,
            'dateto' => $request->date_to,
            'id' => $reservation_id
        ];

        DB::table('room')
        ->where('id',$room_id)
        ->update([
            'status' => 'reserved'
        ]);

        Mail::to($email)->send(new ReservationConfirmation($mailData));

        return response()->json([
            "success" => true,
            "reservation_id" => $reservation_id
        ]);

    }

    public function store(Request $request)
    {
        // Code to store the reservation
    }

    public function edit($id)
    {
        // Code to show edit reservation form
    }

    public function update(Request $request, $id)
    {
        // Code to update the reservation
    }

    public function destroy($id)
    {
        // Code to delete the reservation
    }

    public function viewReservations(Request $request){
        $email = $request->email;
    
        $user = DB::table('users')
        ->where('email',$email)
        ->first();

        if(empty($user)){
            return response()->json([
                "error" => "No user found"
            ]);
        }

        $user = $user->id;
    
        $reservations = DB::table('reservation')
            ->select('date_from','date_to','room_id')
            ->where('activity','pending')
            ->where('user_id',$user)
            ->get();
    
        $reservation_info = [];
    
        foreach($reservations as $reservation){
            $rooms = DB::table('room')
                ->select('type','view')
                ->where('id',$reservation->room_id)
                ->first();
    
            $room_type = $rooms->type;
            $room_view = $rooms->view;
    
            // Add the reservation information to the $reservation_info array
            array_push($reservation_info, [
                'date_from' => $reservation->date_from,
                'date_to' => $reservation->date_to,
                'room_type' => $room_type,
                'room_view' => $room_view
            ]);
        }
    
        // Return the reservation information as a JSON response
        return response()->json([
            $reservation_info
        ]);
    }
    
}
