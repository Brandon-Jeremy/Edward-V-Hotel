<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomInfoController extends Controller
{
    public function roomInfo(){
        $roominfo = DB::table('room_prices')
        ->select('view','type','price')
        ->get();

        return response()->json([
            $roominfo
        ]);

    }

    public function roomAvailability(Request $request){
        $view = $request->view;
        $type = $request->type;
        $date_from = $request->datefrom;
        $date_to = $request->dateto;

        // Check if date_from is before today
        if (strtotime($date_from) < strtotime(date('Y-m-d'))) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid date chosen'
            ], 400);
        }

        // Check if date_to is before date_from
        if (strtotime($date_to) <= strtotime($date_from)) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid date chosen'
            ], 400);
        }
    
        $rooms = DB::table('room')
            ->where('type',$type)
            ->where('view',$view)
            ->get();
    
        $room_id = $rooms->pluck('id')->toArray();
    
        $availableRooms = [];
    
        foreach($room_id as $id){
            $overlappingReservations = DB::table('reservation')
                ->where('room_id',$id)
                ->where('activity','!=','inactive')
                ->where(function($query) use ($date_from, $date_to){
                    $query->whereBetween('date_from', [$date_from, $date_to])
                          ->orWhereBetween('date_to', [$date_from, $date_to])
                          ->orWhere(function($query) use ($date_from, $date_to){
                              $query->where('date_from', '<=', $date_from)
                                    ->where('date_to', '>=', $date_to);
                          });
                })
                ->count();
    
            if($overlappingReservations == 0){
                // The room is available for the given date range
                $availableRooms[] = $id;
            }
        }
    
        return response()->json($availableRooms);
    }
    
}
