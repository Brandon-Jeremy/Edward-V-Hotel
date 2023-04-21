<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use Illuminate\Support\Facades\DB;


class OnlineReservationController extends Controller
{

    public function create()
    {
        // Code to show create reservation form
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
