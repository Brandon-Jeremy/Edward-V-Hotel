<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class WaitinglistController extends Controller
{
    public function addtoWaitinglist(Request $request){
        $email = $request->email;

        $user_id = DB::table('users')
        ->where('email',$email)
        ->first();


        if(empty($user_id)){
            return response()->json([
                "Error" => "This user does not exist"
            ]);
        }

        $found = DB::table('waitinglist')
        ->where('user_id',$user_id->id)
        ->first();

        if(!empty($found)){
            return response()->json([
                "error" => "Guest already in waiting list"
            ]);
        }

        DB::table('waitinglist')->insert([
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => $user_id->id
        ]);

        return response()->json([
            "success" => true
        ]);
    }
}
