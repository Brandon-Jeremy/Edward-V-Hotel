<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\RequestFeedback;
use Illuminate\Support\Facades\Mail;

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
}
