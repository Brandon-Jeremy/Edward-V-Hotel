<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

class GiftcardController extends Controller
{
    public function createGiftcard(Request $request){
        $token = Str::random(10);
        $isRedeemed = false;
        $value = $request->value;
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

        return response()->json([
            "success" => true,
            "Giftcard_ID" => $giftcard_id
        ]);
    }

}
