<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Reward;
use App\Models\User;
use App\Models\Redeem;
use App\Mail\RewardReceived;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\RewardRedeemed;


use Illuminate\Support\Facades\DB;

class rewardController extends Controller
{
    public function getRewards(){
        $rewards = Reward::select('id', 'item', 'price','img_path')->get();
        return response()->json($rewards);
    }

    /**
     * @param id which represents the reward ID
     * @param email user that is purchasing the reward
     * @param recipient recipient that is recieving the email (optional)
     */
    public function purchaseReward(Request $request){
        //Expected request input is the rewardID and the user's email
        //The user's email is expected to be valid since he must be logged in 
        //to access the purchase reward page
        //Find the reward from its table
        $reward = Reward::find($request->id);
        //Find the user from the registered user table
        $email = $request->email;
        $recipientemail = $request->recipient ?? $email;
        $user = User::where('email', $email)->first();
        $recipient = User::where('email',$recipientemail)->first();

        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "User not found",
            ]);
        }
        if(!$recipient){
            return response()->json([
                "success" => false,
                "message" => "Recipient not found",
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
        $redeem->user_id=$recipient->id;
        $redeem->redeemed=false;
        $redeem->save();

        Mail::to($recipientemail)->send(new RewardReceived);
        // Return success response
        return response()->json([
            "success" => true
        ]);
    }

    public function calculatePoints(Request $request){
        $email = $request->email;

        $user = DB::table('users')
        ->where('email',$email)
        ->first();

        if(empty($user)){
            return response()->json([
                "Error" => "No user found"
            ]);
        }
        $points = $user->points;

        return response()->json([
            "Points" => $points
        ]);
    }

    public function userRewards(Request $request){
        $email = $request->email;
        $redeemed = false;


        $user = DB::table('users')
        ->where('email',$email)
        ->first();

        if(empty($user)){
            return response()->json([
                'error' => 'User does not exist'
            ]);
        }

        $rewards = DB::table('redeems')
        ->where('user_id',$user->id)
        ->where('redeemed',$redeemed)
        ->get();

        $rewards_array = $rewards->pluck('reward_id','id')->toArray();


        $reward_list = [];

        foreach($rewards_array as $redeem_table_id => $reward_id){
            $real_reward = DB::table('reward')
                ->where('id', $reward_id)
                ->first();
        
            $reward_item = $real_reward->item;
            $reward_details = $real_reward->details;
            $reward_img = $real_reward->img_path;
        
            $reward_item_array = [
                'redeem_id' => $redeem_table_id,
                'reward_id' => $reward_id,
                'name' => $reward_item,
                'details' => $reward_details,
                'image_path' => $reward_img
            ];
            array_push($reward_list, $reward_item_array);
        }

        return response()->json([
            'rewards' => $reward_list
        ]);

    }
    
    /**
     * @param User_email to validate that he/she owns the item
     * @param redeem_id id in table (autoincrement and unique)
     * @param date_from to pickup (assuming reward is only for airport pickup)
     */
    public function useReward(Request $request){
        $date_from = $request->date_from;
        $email = $request->email;
        $redeem_id = $request->redeem_id;
        
        $user = DB::table('users')
        ->where('email',$email)
        ->first();

        if(empty($user)){
            return response()->json([
                'error' => 'User does not exist'
            ]);
        }

        $redeemed = DB::table('redeems')
        ->where('user_id',$user->id)
        ->where('redeemed',0)
        ->where('id',$redeem_id)
        ->first();

        if(empty($redeemed)){
            return response()->json([
                'error' => 'Reward does not exist or has already been redeemed'
            ]);
        }

        $first_name = $user->first_name;
        $last_name = $user->last_name;
        $setRedeemed = 1;

        $mailData = [
            'first_name' => $first_name,
            'last_name' => $last_name,
            'date_from' => $date_from
        ];

        $hotel_email = 'brandonnader1@gmail.com';

        Mail::to($hotel_email)->send(new RewardRedeemed($mailData));

        DB::table('redeems')
        ->where('user_id',$user->id)
        ->where('id',$redeem_id)
        ->where('redeemed',0)
        ->update([
            'redeemed' => 1
        ]);

        return response()->json([
            'success' => true
        ]);


    }

}
