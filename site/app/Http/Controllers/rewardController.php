<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Reward;
use App\Models\User;
use App\Models\Redeem;

use Illuminate\Support\Facades\DB;

class rewardController extends Controller
{
    public function getRewards(){
        $rewards = Reward::select('id', 'item', 'price','img_path')->get();
        return response()->json($rewards);
    }

    public function purchaseReward(Request $request){
        //Expected request input is the rewardID and the user's email
        //The user's email is expected to be valid since he must be logged in 
        //to access the purchase reward page
        //Find the reward from its table
        $reward = Reward::find($request->id);
        //Find the user from the registered user table
        $email = $request->email;
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "User not found",
            ]);
        }

        // Check if the user has enough points
        if ($user->points < $reward->price) {
            return response()->json([
                "success" => false,
                "message" => "Insufficient points",
            ]);
        }
        // Deduct the points from the user
        $user->points -= $reward->price;
        $user->save();

        //Create a redeem record and update the redeems table
        $redeem = new Redeem;
        $redeem->reward_id=$reward->id;
        $redeem->user_id=$user->id;
        $redeem->redeemed=false;
        $redeem->save();

        // Return success response
        return response()->json([
            "success" => true
        ]);
    }

}
