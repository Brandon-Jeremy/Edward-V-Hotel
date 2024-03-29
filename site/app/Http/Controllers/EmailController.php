<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\RequestFeedback;
use App\Mail\EmailToAllBookedCustomers;
use App\Mail\EmailToAllCustomers;
use App\Mail\FeedbackOrInquiry;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class EmailController extends Controller
{
    /**
     * This can be used as a direct email sender. 
     * 2 birds with 1 stone kinda api
     */
    public function sendEmailToHotel(Request $request){
        $userEmail = $request->email;
        $userMessage = $request->message;

        $hotel_email = 'brandonnader1@gmail.com';

        $mailData = [
            "message" => $userMessage,
            "email" => $userEmail
        ];

        Mail::to($hotel_email)->send(new FeedbackOrInquiry($mailData));
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

    public function emailAll(Request $request){
        $messages = $request->message;

        $mailData = [
            "message" => $messages
        ];

        $users = DB::table('users')
        ->select('email')
        ->where('email','!=', NULL)
        ->get();

        $emails = $users->pluck('email')->toArray();

        // return response()->json([
        //     $emails
        // ]);
    
        foreach ($emails as $email) {
            // echo $email;
            Mail::to($email)->send(new EmailToAllCustomers($mailData));
        }

        return response()->json([
            "Success" => true,
            "Message" => $messages
        ]);
    }
}
