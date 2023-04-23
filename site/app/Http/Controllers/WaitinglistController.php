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
