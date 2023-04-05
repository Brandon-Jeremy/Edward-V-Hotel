<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\onlineUser;

class CustomAuthController extends Controller
{
    //Not needed. Not a server rendered site.
    // public function login(){
    //     return view("auth.login");
    // }

    // public function registration(){
    //     return view("auth.registration");
    // }
    // public function login(Request $requests){
    //     return response()->json([
    //         "success" => true
    //     ]);
    // }

    public function registerUser(Request $request){
        try{

            $user=new onlineUser;
            $user->first_name=$request->first_name;
            $user->last_name=$request->last_name;
            $user->dob=$request->dob;
            $user->email=$request->email;
            $user->phone_num=$request->phone_num;
            $pass=$request->password;
            $user->password=hash("sha256",$pass);
            $user->points=0;
            $user->email_created_at=Carbon::now();
            $user->email_verified_at=NULL;
            $user->details="";

            $user->save();
        }
        catch (\Exception $e) {
            // Code to handle the exception goes here
            return response()->json(['error' => $e->getMessage()], 500);
        }
        

        return response()->json([
            "success" => true
        ]);
    }

    public function loginUser(Request $request){
    $hashedPassword = hash("sha256", $request->password);

    $users = onlineUser::all();
    foreach ($users as $user){
        if ($user->email == $request->email && $user->password == $hashedPassword) {
            return response()->json([
                "success" => true
            ]);
        }
    }
    return response()->json([
        "success" => false
    ]);
    }

}
