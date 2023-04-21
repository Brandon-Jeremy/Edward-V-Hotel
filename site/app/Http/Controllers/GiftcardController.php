<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Mail;
use App\Mail\GiftcardCreated;


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

        if($user_points<$value){
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

        $mailData = [
            'value' => $value,
            'token' => $token
        ];

        Mail::to($email)->send(new GiftcardCreated($mailData));
        

        return response()->json([
            "success" => true,
            "Giftcard_ID" => $giftcard_id,
            "User_ID" => $user->id
        ]);

        
    }

    public function redeemGiftcard(Request $request){
        $email = $request->email;
        $giftcardtoken = $request->giftcardtoken;

        $user = DB::table('users')
        ->where('email',$email)
        ->first();

        if(empty($user)){
            return response()->json([
                "Error" => "User not found"
            ]);
        }

        $giftcode_found = DB::table('giftcode')
        ->where('token',$giftcardtoken)
        ->first();

        if(empty($giftcode_found)){
            return response()->json([
                "success" => false,
                "Error" => "Giftcard not found"
            ]);
        }
        $is_Redeemed = true;
        if($giftcode_found->isRedeemed == true){
            return response()->json([
                "success" => false,
                "Error" => "Giftcard has already been redeemed"
            ]);
        }

        $update_giftcard = DB::table('giftcode')
        ->where('token',$giftcardtoken)
        ->update([
            'updated_at' => Carbon::now(),
            'isRedeemed' => $is_Redeemed
        ]);

        $giftcard_value = $giftcode_found->value;

        $points = $user->points;
        $new_points = $points+$giftcard_value;
        $updated_user = DB::table('users')
        ->where('email',$email)
        ->update([
            'updated_at' => Carbon::now(),
            'points' => $new_points
        ]);

        return response()->json([
            'success' => true
        ]);
    }

}
