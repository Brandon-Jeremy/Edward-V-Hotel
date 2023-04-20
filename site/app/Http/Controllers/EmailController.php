<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\RequestFeedback;
use App\Mail\EmailToAllBookedCustomers;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class EmailController extends Controller
{
    /**
     * This can be used as a direct email sender. 
     * 2 birds with 1 stone kinda api
     */
    public function testEmail(Request $request){
        $userEmail = $request->email;

        // return response()->json([
        //     "Email" => $userEmail
        // ]);

        Mail::to($userEmail)->send(new RequestFeedback);
    }

    public function emailCurrent(Request $request) {
        $messages = $request->message;

        $mailData = [
            "message" => $messages
        ];

        // echo gettype($messages);
    
        $users = DB::table('reservation')
            ->select('user_id')
            ->where('activity', 'active')
            ->get();

        // 2 users found while testing, user_id:1 and user_id:2
    
        $users_id = $users->pluck('user_id')->toArray();
    
        foreach ($users_id as $userid) {
            $users = DB::table('users')
                ->where('id', $userid)
                ->first();
    
            if (optional($users)->email) {
                $user_email = $users->email;
                Mail::to($user_email)->send(new EmailToAllBookedCustomers($mailData));

            }
        }
        
        return response()->json([
            "Success" => true,
            "Message" => $messages
        ]);
    }
}
