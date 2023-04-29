<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ProfileController extends Controller
{
    public function deleteAccount(Request $request){
        $email = $request->email;
        $password = $request->password;

        $user = DB::table('users')
        ->where('email',$email)
        ->first();

        if(empty($user)){
            return response()->json([
                'success' => false,
                'error' => 'User does not exist'
            ]);
        }

        $correctPassword = DB::table('users')
        ->where('email',$email)
        ->where('password',hash('sha256',$password))
        ->first();

        if(empty($correctPassword)){
            return response()->json([
                'success' => false,
                'error' => 'Passwords do not match'
            ]);
        }

        $token = Str::random(5);
        $new_email = $token."deleted@".$email;

        DB::table('users')
        ->where('email',$email)
        ->update([
            'updated_at' => Carbon::now(),
            'email' => $new_email,
            'phone_num' => NULL
        ]);

        return response()->json([
            'success' => true,
        ]);

    }
}
