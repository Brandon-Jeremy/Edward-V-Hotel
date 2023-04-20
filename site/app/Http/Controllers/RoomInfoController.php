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
}
