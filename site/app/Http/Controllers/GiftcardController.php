<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

class GiftcardController extends Controller
{
    public function createGiftcard(Request $request){


    }

    public function purchaseGiftcard(Request $request){
        $email = $request->email;

        $user = DB::table('users')
        ->where('email',$email)
        ->first();

        if(empty($user)){
            return response()->json([
                'Error' => 'User does not exist'
            ]);
        }
        $user_points = $user->points;
        $value = $request->value;

        if($user_points<$value*3){
            return response([
                "Error" => "Insufficient points"
            ]);
        }
        //Giftcard details
        $token = Str::random(10);
        $isRedeemed = false;
        $creation_date = Carbon::now();
        $expiration_date = $creation_date->copy()->addMonths(3);

        $giftcard_id = DB::table('giftcode')->insertGetId([
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'isRedeemed' => $isRedeemed,
            'token' => $token,
            'value' => $value,
            'creation_date' => $creation_date,
            'expiration_date' => $expiration_date,
        ]);

        $new_points = $user_points - $value*3;

        DB::table('users')
        ->where('id',$user->id)
        ->update([
            'points' => $new_points
        ]);

        //Credit giftcard to account
        DB::table('purchase_giftcode')->insert([
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'onlineuser_id' => $user->id,
            'giftcard_id' => $giftcard_id
        ]);


        return response()->json([
            "success" => true,
            "Giftcard_ID" => $giftcard_id,
            "User_ID" => $user->id
        ]);

        
    }

}
